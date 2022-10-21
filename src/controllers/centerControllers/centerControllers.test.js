import codes from "../../config/codes";
import CreateError from "../../utils/CreateError/CreateError";
import {
  getAllCenters,
  newSportsCenter,
  signUserUp,
} from "./centerControllers";
import mockSportsCenter from "../../test-utils/mocks/mockSportsCenter.js";
import mockUser from "../../test-utils/mocks/mockUser";
import { emptyUserModel } from "../../data/emptyModels";
import curateData from "../../utils/curateData/curateData";
import { Activity, SportsCenter, User } from "../../database/runModels";
import setOptions from "../../utils/setOptions/setOptions";

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
        const reqId = { ...req, body: { ...mockUser, id: 1 } };
        const expectedError = CreateError(
          codes.badRequest,
          "The user is already signed up",
          "Invalid request. Try providing a valid user id or valid user registration data. Make sure that the provided center ID is correct"
        );
        SportsCenter.findByPk = () => ({
          ...mockSportsCenter,
          save: mockSave,
        });

        await signUserUp(reqId, res, next);

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
      const idReq = {
        ...req,
        body: {
          id: 1,
        },
      };

      User.create = () => mockUser;

      test("Then it should try to find an existing user", async () => {
        const next = jest.fn();
        User.findByPk = jest.fn();
        SportsCenter.findByPk = () => ({
          ...mockSportsCenter,
          users: [],
          save: mockSave,
        });

        await signUserUp(idReq, res, next);

        expect(User.findByPk).toHaveBeenCalled();
      });

      test("Then it should call next with an error if the specified id doesn't exist", async () => {
        const next = jest.fn();

        const expectedError = CreateError(
          codes.badRequest,
          "The requested user doesn't exist or the sign up data was not valid",
          "Invalid request. Try providing a valid user id or valid user registration data. Make sure that the provided center ID is correct"
        );
        SportsCenter.findByPk = () => ({
          ...mockSportsCenter,
          users: [],
          save: mockSave,
        });
        User.findByPk = () =>
          Promise.reject(
            new Error(
              "The requested user doesn't exist or the sign up data was not valid"
            )
          );

        await signUserUp(idReq, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);
        const calledWith = next.mock.calls[0][0];
        expect(calledWith.privateMessage).toBe(expectedError.privateMessage);

        User.findByPk = jest.fn();
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

describe("Given a getAllCenters controller", () => {
  describe("When called with a request, a response and a next function", () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    test(`Then it should respond with a status of ${codes.ok}`, async () => {
      SportsCenter.findAll = () => Promise.resolve([mockSportsCenter]);

      await getAllCenters(req, res, next);

      expect(res.status).toHaveBeenCalledWith(codes.ok);
    });

    test("Then it should respond with all the sports center", async () => {
      SportsCenter.findAll = jest.fn().mockResolvedValue([mockSportsCenter]);

      await getAllCenters(req, res, next);

      expect(SportsCenter.findAll).toHaveBeenCalledWith(
        setOptions(Activity, false, "name", "description")
      );

      expect(res.json).toHaveBeenCalled();
    });

    test("Then it should call next with an error if something goes wrong", async () => {
      const expectedError = CreateError(
        codes.badRequest,
        "",
        "Couldn't retrieve all the sports centers"
      );

      SportsCenter.findAll = jest.fn().mockRejectedValue(new Error());

      await getAllCenters(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
