import codes from "../../config/codes.js";

const endpointNotFound = (_, res) => {
  res.status(codes.notFound).json({ error: "Endpoint not found" });
};

export default endpointNotFound;
