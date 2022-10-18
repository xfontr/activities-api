import codes from "../config/codes";
import endpointNotFound from "./endpointNotFound";

describe("Given a endpointNotFound middleware", () => {
  describe("When called with a request and a response as arguments", () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test(`Then it should respond with a status of '${codes.notFound}'`, () => {
      endpointNotFound(req, res);

      expect(res.status).toHaveBeenCalledWith(codes.notFound);
    });

    test("Then it should send an error message", () => {
      const errormessage = { error: "Endpoint not found" };
      endpointNotFound(req, res);

      expect(res.json).toHaveBeenCalledWith(errormessage);
    });
  });
});
