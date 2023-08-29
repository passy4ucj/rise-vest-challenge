import { Comment } from "@prisma/client";
import { prisma } from "../client";

export interface Commentdata
  extends Omit<
    Comment,
    "id" | "createdAt" | "updatedAt"
  > {}

export const createCommentService = async (
  data: Commentdata,
): Promise<Comment | null> => {

  return prisma.comment.create({
    data: {
      ...data,
    },
  });
};

export const getAllCommentsService = async (postId: string): Promise<Comment[]> => {
  return await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "desc" },
    include: {
        post: true,
        user: true,
    }
  });
};