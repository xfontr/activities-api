import { Joi } from "express-validation";
import { requirements } from "../config/models.js";

const { name } = requirements;

const activitySchema = {
  body: Joi.object({
    name: Joi.string().min(1).max(name.long).required(),
    description: Joi.string(),
    centerId: Joi.number(),
  }),
};

export default activitySchema;
