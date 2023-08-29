import { body } from "express-validator";

export const registerUserSchema = () => {
  return [
    body("name").notEmpty().withMessage("Please provide your name"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .notEmpty()
      .trim()
      .isLength({ min: 6, max: 25 })
      .withMessage("Password must be between 6 to 25 characters"),
  ];
};