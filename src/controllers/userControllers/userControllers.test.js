import codes from "../../config/codes";
import mockUser, { mockProtoUser } from "../../test-utils/mocks/mockUser";
import mockActivity from "../../test-utils/mocks/mockActivity";
import CreateError from "../../utils/CreateError/CreateError";
import { getAllUsers, joinActivity, newUser } from "./userControllers";
import { User, Activity } from "../../database/runModels";
import setOptions from "../../utils/setOptions/setOptions";

describe("Given a newUser controller", () => {
  describe("When called with a request, a response and a next function", () => {
    const req = {
      body: mockProtoUser,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    User.create = () => mockUser;

    describe("And the request contains a valid user", () => {
      test(`Then it should respond with a status of ${codes.created}`, async () => {
        await newUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(codes.created);
      });

      test("Then it should respond with the complete user created", async () => {
        const expectedUser = mockUser;

        await newUser(req, res, next);

        expect(res.json).toHaveBeenCalledWith({ createdUser: expectedUser });
      });
    });

    describe("And something goes wrong while creating the user", () => {
      test("Then it shoudl call next with an error", async () => {
        User.create = () => Promise.reject(new Error(""));

        const expectedError = CreateError(
          codes.badRequest,
          "",
          "Invalid request"
        );

        await newUser(req, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);

        const calledWith = next.mock.calls[0][0];
        expect(calledWith.message).toBe(expectedError.message);
      });
    });
  });
});

describe("Given a joinActivity controller", () => {
  describe("When called with a request, a response and a next function", () => {
    const id = 1;
    const req = {
      params: { userId: id },
      query: { activityId: id },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const mockAddActivity = jest.fn();

    describe("And the request contains a valid user and a valid activity", () => {
      User.findByPk = () => ({
        ...mockUser,
        id,
        addActivity: mockAddActivity,
      });
      Activity.findByPk = () => ({ ...mockActivity, id });

      test(`Then it should respond with a status of ${codes.ok}`, async () => {
        await joinActivity(req, res, next);

        expect(res.status).toHaveBeenCalledWith(codes.ok);
      });

      test("Then it should respond with a success message, after adding the activity", async () => {
        const expectedResponse = {
          success: `Activity with id ${id} added to the user with id ${id}`,
        };

        await joinActivity(req, res, next);

        expect(mockAddActivity).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
      });
    });

    describe("And the request contains an ivalid user and a valid activity", () => {
      test("Then it should call next with an error", async () => {
        User.findByPk = () => null;

        const expectedError = CreateError(
          codes.badRequest,
          "Invalid user or activity",
          "Invalid request"
        );

        await joinActivity(req, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);
        const calledWith = next.mock.calls[0][0];
        expect(calledWith.privateMessage).toBe(expectedError.privateMessage);
      });
    });

    describe("And the request contains an ivalid activity and a valid user", () => {
      test("Then it should call next with an error", async () => {
        Activity.findByPk = () => null;

        const expectedError = CreateError(
          codes.badRequest,
          "Invalid user or activity",
          "Invalid request"
        );

        await joinActivity(req, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);
        const calledWith = next.mock.calls[0][0];
        expect(calledWith.privateMessage).toBe(expectedError.privateMessage);
      });
    });
  });
});

describe("Given a getAllUsers controller", () => {
  describe("When called with a request, a response and a next function", () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    User.findAll = jest
      .fn()
      .mockResolvedValue([{ ...mockUser, activities: [] }]);

    test(`Then it should respond with a status ${codes.ok}`, async () => {
      await getAllUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(codes.ok);
    });

    test("Then it should respond with a list of users and their activities", async () => {
      const expectedResponse = {
        allUsers: [{ ...mockUser, activities: [] }],
      };

      await getAllUsers(req, res, next);

      expect(User.findAll).toHaveBeenCalledWith(
        setOptions(Activity, true, "name", "description")
      );
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    describe("And something goes wrong while getting the data", () => {
      test("Then it should call next with an error", async () => {
        User.findAll = jest.fn().mockRejectedValue(new Error(""));
        const expectedError = CreateError(
          codes.badRequest,
          "",
          "Couldn't retrieve the users"
        );

        await getAllUsers(req, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});
