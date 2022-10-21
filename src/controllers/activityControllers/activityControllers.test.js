import codes from "../../config/codes";
import CreateError from "../../utils/CreateError/CreateError";
import mockActivity from "../../test-utils/mocks/mockActivity.js";
import newActivity, { getAllActivities } from "./activityControllers";
import { Activity, SportsCenter } from "../../database/runModels";
import setOptions from "../../utils/setOptions/setOptions";

describe("Given a newActivity controller", () => {
  describe("When called with a request, a response and a next function", () => {
    const req = {
      body: mockActivity,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    Activity.create = () => mockActivity;

    describe("And the request contains a valid activity", () => {
      test(`Then it should respond with a status of ${codes.created}`, async () => {
        await newActivity(req, res, next);

        expect(res.status).toHaveBeenCalledWith(codes.created);
      });

      test("Then it should respond with the complete activity created", async () => {
        const expectedActivity = mockActivity;

        await newActivity(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
          createdActivity: expectedActivity,
        });
      });
    });

    describe("And something goes wrong while creating the activity", () => {
      test("Then it shoudl call next with an error", async () => {
        Activity.create = () => Promise.reject(new Error(""));

        const expectedError = CreateError(
          codes.badRequest,
          "",
          "Invalid request"
        );

        await newActivity(req, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);

        const calledWith = next.mock.calls[0][0];
        expect(calledWith.message).toBe(expectedError.message);
      });
    });
  });
});

describe("Given a getAllActivities controller", () => {
  describe("When called with a request, a response and a next function", () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    test(`Then it should respond with a status of ${codes.ok}`, async () => {
      Activity.findAll = () => Promise.resolve([mockActivity]);

      await getAllActivities(req, res, next);

      expect(res.status).toHaveBeenCalledWith(codes.ok);
    });

    test("Then it should respond with all the sports center", async () => {
      Activity.findAll = jest.fn().mockResolvedValue([mockActivity]);

      await getAllActivities(req, res, next);

      expect(Activity.findAll).toHaveBeenCalledWith(
        setOptions(SportsCenter, false, "name", "description")
      );

      expect(res.json).toHaveBeenCalled();
    });

    test("Then it should call next with an error if something goes wrong", async () => {
      const expectedError = CreateError(
        codes.badRequest,
        "",
        "Couldn't retrieve the activities"
      );

      Activity.findAll = jest.fn().mockRejectedValue(new Error());

      await getAllActivities(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
