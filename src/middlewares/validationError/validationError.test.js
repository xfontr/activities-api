import { ValidationError } from "express-validation";
import codes from "../../config/codes";
import validationError from "./validationError";
import CreateError from "../../utils/CreateError/CreateError";

describe("Given a validationError middleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = {};

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();
  describe("When called with a joi error", () => {
    test(`Then it should respond with a status of '${codes.badRequest}'`, () => {
      const joiError = new ValidationError({}, {});

      validationError(joiError, req, res, next);

      expect(res.status).toHaveBeenCalledWith(codes.badRequest);
    });

    test("Then it should respond with a error message", () => {
      const joiError = new ValidationError({}, {});

      validationError(joiError, req, res, next);

      expect(res.json).toHaveBeenCalledWith({ error: "Bad request" });
    });
  });

  describe("When called with a custom error", () => {
    test("Then it should call next with the error", () => {
      const error = CreateError();

      validationError(error, req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
