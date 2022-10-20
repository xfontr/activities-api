import codes from "../../config/codes";
import mockUser from "../../test-utils/mocks/mockUser";
import CreateError from "../../utils/CreateError/CreateError";
import validateRequest from "./validateRequest";

describe("Given a validateRequest middleware", () => {
  describe("When called with a request, a response and a next function", () => {
    const res = {};

    describe("And the request is completely empty", () => {
      test("Then it should call next with an error", async () => {
        const expectedError = CreateError(
          codes.badRequest,
          "Empty request",
          "Empty request"
        );

        const next = jest.fn();

        const req = {
          body: {},
        };

        await validateRequest(req, res, next);

        expect(next).toHaveBeenCalledWith(expectedError);

        const calledWith = next.mock.calls[0][0];
        expect(calledWith.message).toBe(expectedError.message);
      });
    });

    describe("And the request has at least one field of data", () => {
      test("Then it should call next", async () => {
        const next = jest.fn();

        const req = {
          body: {
            user: mockUser,
          },
        };

        await validateRequest(req, res, next);

        expect(next).toHaveBeenCalled();

        const calledWith = next.mock.calls[0][0];
        expect(calledWith).toBeUndefined();
      });
    });
  });
});
