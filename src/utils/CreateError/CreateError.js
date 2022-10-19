import codes from "../../config/codes.js";

const CreateError = (code, privateMessage, publicMessage) => {
  const error = new Error(publicMessage);

  error.code = code || codes.internalServerError;
  error.privateMessage = privateMessage || "";

  return error;
};

export default CreateError;
