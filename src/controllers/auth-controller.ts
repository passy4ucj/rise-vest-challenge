import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  generateJWT,
  Password,
  successResponse,
} from "../helpers";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import Logger from "../logger";
import axios from "axios";
import { createUser, findUser, findUserByIdService, getAllUserService, getTopUsersWithLatestCommentsService, } from "../services/auth-service";


// @desc    Admin Register User
// @route   POST    /api/v2/auth/register-user
export const registerUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  let user = await findUser(email);

  if (user)
    throw new BadRequestError(`User with the email ${email} exists`);
  
  const data = await createUser({
    name,
    email,
    password,
  });

  delete data.password

  return successResponse(res, StatusCodes.CREATED, data);
};

// @desc    Login Users
// @route   POST    /api/v2/auth/signin-buyer
export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await findUser(email);

  if (!user) throw new BadRequestError("Invalid credentials");

  const passwordMatch = await Password.comparePassword(
    password,
    user?.password!
  );

  if (!passwordMatch) throw new BadRequestError("Invalid credentials");

  // After providing valid credentials
  // Generate the JWT and attach it to the req session object
  const userJWT = generateJWT(req, {
    id: user.id,
    email: user.email,
    name: user.name,
  });

  // remove password from the user object
  delete user.password;

  return successResponse(res, StatusCodes.OK, {
    user,
    token: userJWT
  });
};


// @desc    Fetches the current user
// @route   GET   /api/v2/auth/signin
export const currentUser = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ currentUser: null });
  }

  const currentUser = await findUserByIdService(req.currentUser.id)
  delete currentUser?.password;
  
  return res
    .status(StatusCodes.OK)
    .json({ message: "success", currentUser });
};

export const getAllUserController = async (req: Request, res: Response) => {
  const users = await getAllUserService(req.query);
  return successResponse(res, StatusCodes.OK, users);
};

export const getUserController = async (req: Request, res: Response) => {
  const { userID } = req.params;

  const user = await findUserByIdService(userID);

  if (!user) throw new NotFoundError("Invalid user ID");

  delete user.password;
  return successResponse(res, StatusCodes.OK, user);
};

export const getTopUsersWithLatestCommentsController = async (req: Request, res: Response) => {

  const users = await getTopUsersWithLatestCommentsService();

  return successResponse(res, StatusCodes.OK, users);
};

