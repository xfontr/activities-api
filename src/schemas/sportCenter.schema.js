import { Joi } from "express-validation";
import { requirements } from "../config/models.js";

const { name } = requirements;

const sportCenterSchema = {
  body: Joi.object({
    name: Joi.string().min(1).max(name.long).required(),
    description: Joi.string(),
    users: Joi.array(),
    activities: Joi.array(),
  }),
};

export default sportCenterSchema;
