import codes from "../../config/codes.js";
import { emptySportsCenterModel } from "../../data/emptyModels.js";
import { SportsCenter } from "../../database/index.js";
import CreateError from "../../utils/CreateError/CreateError";
import curateData from "../../utils/curateData/curateData.js";

const newSportsCenter = async (req, res, next) => {
  const centerData = req.body;

  try {
    const createdCenter = await SportsCenter.create(
      curateData(emptySportsCenterModel, centerData)
    );

    res.status(codes.created).json({ createdCenter });
  } catch (error) {
    const newError = CreateError(
      codes.badRequest,
      error.mesage,
      "Invalid request"
    );
    next(newError);
  }
};

export default newSportsCenter;
