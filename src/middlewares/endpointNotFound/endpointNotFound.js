import codes from "../../config/codes";

const endpointNotFound = (_, res) => {
  res.status(codes.notFound).json({ error: "Endpoint not found" });
};

export default endpointNotFound;
