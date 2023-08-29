import { body } from "express-validator";

export const loginSchema = () => {
  return [
    body("email").isEmail().withMessage("Please provide an email"),
    body("password").notEmpty().withMessage("Please provide a password"),
  ];
};