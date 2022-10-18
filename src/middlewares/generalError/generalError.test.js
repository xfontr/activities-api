import codes from "../../config/codes";
import CreateError from "../../utils/CreateError/CreateError";
import generalError from "./generalError";

describe("Given a generalError middleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = {};

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();
  describe("When called with a normal error (with undefined parameters), a request and a response as arguments", () => {
    test(`Then it should call res.status with a default status of '${codes.internalServerError}'`, () => {
      const error = new Error();

      generalError(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(codes.internalServerError);
    });

    test("Then it should call json with a generic error message", () => {
      const expectedMessage = "Internal server error";
      const expectedResponse = { error: expectedMessage };
      const error = new Error();

      generalError(error, req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe(`When called with a custom error with a code of ${codes.badRequest}`, () => {
    test("Then it should call res.status with said status", () => {
      const customError = CreateError(codes.internalServerError);

      generalError(customError, req, res, next);

      expect(res.status).toHaveBeenCalledWith(codes.internalServerError);
    });
  });

  describe("When called with a custom error with a public message 'Public error'", () => {
    test("Then it should call res.json with said error message", () => {
      const errorMessage = "Public error";
      const expectedResponse = { error: errorMessage };
      const customError = CreateError(undefined, undefined, errorMessage);

      generalError(customError, req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
