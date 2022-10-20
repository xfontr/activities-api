import codes from "../../config/codes.js";
import CreateError from "../../utils/CreateError/CreateError.js";

const validateRequest = async (req, res, next) => {
  const { body } = await req;

  if (!Object.keys(body).length) {
    const error = CreateError(
      codes.badRequest,
      "Empty request",
      "Empty request"
    );
    next(error);
    return;
  }
  next();
};

export default validateRequest;
