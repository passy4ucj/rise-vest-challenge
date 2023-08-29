import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../errors";

export const requireAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new UnauthorizedError();
  next();
};
