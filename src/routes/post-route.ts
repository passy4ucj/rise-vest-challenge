import { Router } from "express";
import {
    validateRequestMiddleware,
  } from "../helpers";
import {
  createCommentSchema,
} from "../schema";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";
import { createCommentController, getAllCommentsController } from "../controllers/comment-controller";

const router = Router();

// Protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);


router
  .route("/:postId/comments")
  .get(getAllCommentsController)
  .post(
    createCommentSchema(),
    validateRequestMiddleware,
    createCommentController
  );

export { router as postRoutes };