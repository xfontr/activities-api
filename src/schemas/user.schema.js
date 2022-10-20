import { Joi } from "express-validation";
import { requirements } from "../config/models.js";

const { name } = requirements;

const userSchema = {
  body: Joi.object({
    name: Joi.string().min(1).max(name.short),
    firstSurname: Joi.string().min(1).max(name.short),
    secondSurname: Joi.string().min(1).max(name.short),
  }),
};

export default userSchema;
