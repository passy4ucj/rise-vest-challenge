
import { prisma } from "../client";
import { User } from "@prisma/client";

export type UserAccount = Pick<
    User,
    "name" | "email" | "password"
    >;

// excluded password types
export type ReturnedUser = Partial<Pick<User, "password">> &
Omit<User, "password">;


export const createUser = async (data: UserAccount): Promise<ReturnedUser> => {
const user: ReturnedUser = await prisma.user.create({
    data: { ...data },
});
delete user.password;

return user;
};

export const findUser = async (
    email: string
): Promise<ReturnedUser | null> => {
    return await prisma.user.findUnique({ where: { email } });
};

export const findUserByIdService = async (
userId: string
): Promise<ReturnedUser | null> => {
return await prisma.user.findUnique({ 
    where: { id: userId },
});
};

export const getAllUserService = async (query: any) => {

let filterObject: any;
filterObject = {
    name: query.name,
}

return await prisma.user.findMany({
    where: {
    ...filterObject
    },
    select: {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
    },
});
};


export const getTopUsersWithLatestCommentsService = async() => {
    const topUsersWithLatestComments = await prisma.user.findMany({
      take: 3,
      orderBy: {
        posts: {
          _count: 'desc'
        }
      },
      include: {
        posts: {
          select: {
            id: true,
            comments: {
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        }
      }
    });
  
    return topUsersWithLatestComments;
};