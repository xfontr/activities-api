import codes from "../config/codes";

const notFound = (_, res) => {
  res.status(codes.notFound).json({ error: "Endpoint not found" });
};

export default notFound;
