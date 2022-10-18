import codes from "../../config/codes";
import CreateError from "./CreateError";

describe("Given a CreateError function", () => {
  const errorCode = 500;
  const publicError = "Public error";
  const privateMessage = "Private error";

  describe("When instantiated with an error code, a private message and a public one", () => {
    test("Then it should return an error object with said code and messages", () => {
      const expectedError = new Error("");
      expectedError.message = publicError;

      const resultError = CreateError(errorCode, privateMessage, publicError);

      expect(resultError).toStrictEqual(expectedError);
    });
  });

  describe("When instantiated with private and public messages, but without error code", () => {
    test(`Then it should return an error object with a code ${codes.internalServerError}`, () => {
      const expectedError = new Error("");
      expectedError.message = publicError;
      expectedError.code = codes.internalServerError;

      const resultError = CreateError(undefined, privateMessage, publicError);

      expect(resultError).toStrictEqual(expectedError);
    });
  });
});
