import { body, } from "express-validator";

export const createPostSchema = () => {
  return [
    body("title").notEmpty().withMessage("title cannot be empty"),
    body("content").notEmpty().withMessage("Please provide a content"),
  ];
};