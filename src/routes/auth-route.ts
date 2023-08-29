import { Router } from "express";
import { currentUser, getAllUserController, getTopUsersWithLatestCommentsController, getUserController, loginUserController, registerUserController  } from "../controllers/auth-controller";

import {
  validateRequestMiddleware,
} from "../helpers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";
import { loginSchema, registerUserSchema } from "../schema/auth";
import { createPostSchema } from "../schema";
import { createPostController, getAllPostsController } from "../controllers";


const router = Router();


// sign in route
router
  .route("/signin-user")
  .post(loginSchema(), validateRequestMiddleware, loginUserController);

// current user route
router.route("/current-user").get(currentUserMiddleware, currentUser);

router
  .route("/")
  .post(
    registerUserSchema(),
    validateRequestMiddleware,
    registerUserController
  );
  
// protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);

router.route("/").get(getAllUserController);
router.route("/top-users").get(getTopUsersWithLatestCommentsController);

router
  .route("/:id/posts")
  .get(getAllPostsController)
  .post(
    createPostSchema(),
    validateRequestMiddleware,
    createPostController
  );




export { router as authenticationRoutes };