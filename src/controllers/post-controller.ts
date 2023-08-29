import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ForbiddenError } from "../errors";
import { successResponse } from "../helpers";
import { createPostService, findUserByIdService, getAllPostsService } from "../services";

export const createPostController = async (
  req: Request,
  res: Response
) => {
  const {
    id
  } = req.params

  const user = await findUserByIdService(id);

  if(!user) throw new ForbiddenError();

  const {
    title,
    content
  } = req.body;

  const post = await createPostService({
    title,
    content,
    userId: id,
  });

  if (!post) throw new BadRequestError("Invalid Post");
  return successResponse(res, StatusCodes.CREATED, post);
};

export const getAllPostsController = async (req: Request, res: Response) => {
  const posts = await getAllPostsService(req.params.id);
  return successResponse(res, StatusCodes.OK, posts);
};