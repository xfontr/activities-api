import codes from "../../config/codes";
import { User } from "../../database";
import mockUser, { mockProtoUser } from "../../test-utils/mocks/mockUser";
import CreateError from "../../utils/CreateError/CreateError";
import { newUser } from "./userControllers";

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

    describe("And the request is completely empty", () => {
      const emptyReq = { ...req, body: {} };
      test("Then it should call next with an error", async () => {
        const expectedError = CreateError(
          codes.badRequest,
          "Empty request",
          "Invalid request"
        );

        await newUser(emptyReq, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);

        const calledWith = next.mock.calls[0][0];
        expect(calledWith.message).toBe(expectedError.message);
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
