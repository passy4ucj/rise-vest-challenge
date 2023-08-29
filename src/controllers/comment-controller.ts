import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ForbiddenError } from "../errors";
import { successResponse } from "../helpers";
import { createCommentService, getAllCommentsService, getPostService } from "../services";

export const createCommentController = async (
  req: Request,
  res: Response
) => {
  const user = req.currentUser

  if(!user) throw new ForbiddenError();

  const {
    content,
  } = req.body;

  const {
    postId
  } = req.params

  const post = await getPostService(postId);

  if(!post) throw new BadRequestError('Post not found');

  const comment = await createCommentService({
      content,
      userId: user.id,
      postId
  });

  if (!comment) throw new BadRequestError("Invalid Comment");
  return successResponse(res, StatusCodes.CREATED, comment);
};

export const getAllCommentsController = async (req: Request, res: Response) => {
  const comments = await getAllCommentsService(req.params.postId);
  return successResponse(res, StatusCodes.OK, comments);
};