const CreateError = (code, privateMessage, publicMessage) => {
  const error = new Error();

  error.code = code;
  error.message = publicMessage;
  error.privateMessage = privateMessage;

  return error;
};
