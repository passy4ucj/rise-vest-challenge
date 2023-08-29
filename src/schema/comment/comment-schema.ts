import { body, } from "express-validator";

export const createCommentSchema = () => {
  return [
    // body("postId").notEmpty().withMessage("postId cannot be empty"),
    body("content").notEmpty().withMessage("Please provide a content"),
  ];
};