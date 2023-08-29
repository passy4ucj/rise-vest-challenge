import { Post } from "@prisma/client";
import { prisma } from "../client";

export interface Postdata
  extends Omit<
    Post,
    "id" | "createdAt" | "updatedAt"
  > {}

export const createPostService = async (
  data: Postdata,
): Promise<Post | null> => {

  return prisma.post.create({
    data: {
      ...data,
    },
  });
};

export const getAllPostsService = async (userId: string): Promise<Post[]> => {
  return await prisma.post.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      user: true,
  }
  });
};

export const getPostService = async (
  id: string
): Promise<Post | null> => {
  return await prisma.post.findUnique({ 
    where: { id },
    include: {
      comments: true,
      user: true,
  }
  });
};