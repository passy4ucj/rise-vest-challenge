// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// describe('UserService', () => {
//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   it('should fetch the top users with latest comments', async () => {
//     // const topUsersWithLatestComments = await userService.getTopUsersWithLatestComments();
//     // expect(topUsersWithLatestComments).toHaveLength(3);
//     expect(1).toEqual(1)

//     // Assuming you have assertions here to validate the structure of the returned data
//   });
// });

import {
    createUser,
    findUser,
  } from '../auth-service';
  import { PrismaClient, User } from '@prisma/client';
  
  describe('Authentication Service', () => {
    let prisma: PrismaClient;
  
    beforeAll(() => {
      prisma = new PrismaClient();
    });
  
    afterAll(async () => {
      await prisma.$disconnect();
    });
  
    it('should create a user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password'
      };

      prisma.user.create = jest.fn().mockResolvedValue({
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      const result = await createUser(userData);
      expect(result.name).toBe('Test User');
    });
  
    it('should find a user by email', async () => {
      const email = 'test@example.com';
  
      prisma.user.findUnique = jest.fn().mockResolvedValue({
        name: 'Test User',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      } as User | null);
  
      const result = await findUser(email);
      expect(result?.name).toBe('Test User');
    });
  
  });