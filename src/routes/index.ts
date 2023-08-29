import { Router } from "express";
import { authenticationRoutes } from "./auth-route";
import { postRoutes } from "./post-route";

const router = Router();

router.use("/users", authenticationRoutes);
router.use("/posts", postRoutes);

export { router as applicationRoutes };