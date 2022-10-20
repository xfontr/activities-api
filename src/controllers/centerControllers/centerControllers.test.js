import codes from "../../config/codes";
import { SportsCenter, User } from "../../database";
import CreateError from "../../utils/CreateError/CreateError";
import { newSportsCenter, signUserUp } from "./centerControllers";
import mockSportsCenter from "../../test-utils/mocks/mockSportsCenter.js";
import mockUser from "../../test-utils/mocks/mockUser";
import { emptyUserModel } from "../../data/emptyModels";
import curateData from "../../utils/curateData/curateData";

describe("Given a newSportsCenter controller", () => {
  describe("When called with a request, a response and a next function", () => {
    const req = {
      body: mockSportsCenter,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    SportsCenter.create = () => mockSportsCenter;

    describe("And the request contains a valid center", () => {
      test(`Then it should respond with a status of ${codes.created}`, async () => {
        await newSportsCenter(req, res, next);

        expect(res.status).toHaveBeenCalledWith(codes.created);
      });

      test("Then it should respond with the complete center created", async () => {
        const expectedCenter = mockSportsCenter;

        await newSportsCenter(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
          createdCenter: expectedCenter,
        });
      });
    });

    describe("And something goes wrong while creating the center", () => {
      test("Then it shoudl call next with an error", async () => {
        SportsCenter.create = () => Promise.reject(new Error(""));

        const expectedError = CreateError(
          codes.badRequest,
          "",
          "Invalid request"
        );

        await newSportsCenter(req, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);

        const calledWith = next.mock.calls[0][0];
        expect(calledWith.message).toBe(expectedError.message);
      });
    });
  });
});

describe("Given a signUserUp controller", () => {
  describe("When called with a request, a response and a next function", () => {
    const id = 1;

    const req = {
      body: mockUser,
      query: { centerId: id },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockSave = jest.fn();

    describe("And the request contains a valid center and a valid user id", () => {
      SportsCenter.findByPk = () => ({
        ...mockSportsCenter,
        users: [],
        save: mockSave,
      });

      User.findByPk = () => mockUser;
      User.create = () => mockUser;

      const next = jest.fn();

      test(`Then it should respond with a status of ${codes.ok}`, async () => {
        await signUserUp(req, res, next);

        expect(res.status).toHaveBeenCalledWith(codes.ok);
      });

      test("Then it should respond with a success message", async () => {
        const expectedResponse = {
          success: `User with id ${mockUser.id} was added to the requested center`,
        };

        await signUserUp(req, res, next);

        expect(res.json).toHaveBeenCalledWith(expectedResponse);
      });
    });

    describe("And the request contains a valid center but an already signed up user", () => {
      User.findByPk = () => mockUser;
      User.create = () => mockUser;

      test("Then it should call next with an error", async () => {
        const next = jest.fn();
        const expectedError = CreateError(
          codes.badRequest,
          "The user is already signed up",
          "Invalid request. Try providing a valid user id or valid user registration data. Make sure that the provided center ID is correct"
        );
        SportsCenter.findByPk = () => ({
          ...mockSportsCenter,
          save: mockSave,
        });

        await signUserUp(req, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);
        const calledWith = next.mock.calls[0][0];
        expect(calledWith.privateMessage).toBe(expectedError.privateMessage);
      });
    });

    describe("And the request specifies a center that doesn't exist", () => {
      User.findByPk = () => mockUser;
      User.create = () => mockUser;

      test("Then it should call next with an error", async () => {
        const expectedError = CreateError(
          codes.badRequest,
          "The requested sports center doesn't exist",
          "Invalid request. Try providing a valid user id or valid user registration data. Make sure that the provided center ID is correct"
        );

        const next = jest.fn();
        SportsCenter.findByPk = () => null;

        await signUserUp(req, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);
        const calledWith = next.mock.calls[0][0];
        expect(calledWith.privateMessage).toBe(expectedError.privateMessage);

        SportsCenter.findByPk = () => mockSportsCenter;
      });
    });

    describe("And the request specifies a user id", () => {
      const next = jest.fn();

      const idReq = {
        ...req,
        body: {
          id: 1,
        },
      };

      SportsCenter.findByPk = () => ({
        ...mockSportsCenter,
        users: [],
        save: mockSave,
      });
      User.create = () => mockUser;

      test("Then it should try to find an existing user", async () => {
        User.findByPk = jest.fn();

        await signUserUp(idReq, res, next);

        expect(User.findByPk).toHaveBeenCalled();
      });

      test("Then it should call next with an error if the specified id doesn't exist", async () => {
        const expectedError = CreateError(
          codes.badRequest,
          "The requested user doesn't exist or the sign up data was not valid",
          "Invalid request. Try providing a valid user id or valid user registration data. Make sure that the provided center ID is correct"
        );

        User.findByPk = jest
          .fn()
          .mockRejectedValue(
            new Error(
              "The requested user doesn't exist or the sign up data was not valid"
            )
          );

        await signUserUp(idReq, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);
        const calledWith = next.mock.calls[0][0];
        expect(calledWith.privateMessage).toBe(expectedError.privateMessage);
      });
    });

    describe("And the request doesn't specify a user id", () => {
      test("Then it should create a new user", async () => {
        const next = jest.fn();

        const idReq = {
          ...req,
          body: {
            mockUser,
          },
        };

        SportsCenter.findByPk = () => ({
          ...mockSportsCenter,
          users: [],
          save: mockSave,
        });
        User.create = jest.fn().mockReturnValue(mockUser);

        User.findByPk = jest.fn();

        await signUserUp(idReq, res, next);

        expect(User.create).toHaveBeenCalledWith(
          curateData(emptyUserModel, idReq.body)
        );
      });
    });
  });
});
