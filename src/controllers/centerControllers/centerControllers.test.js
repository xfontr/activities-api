import codes from "../../config/codes";
import { SportsCenter } from "../../database";
import CreateError from "../../utils/CreateError/CreateError";
import newSportsCenter from "./centerControllers";
import mockSportsCenter from "../../test-utils/mocks/mockSportsCenter.js";

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
