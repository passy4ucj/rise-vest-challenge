import { ReturnedUser, findUser } from '../auth-service';
import {
    createPostService,
    getAllPostsService,
    getPostService
  } from '../post-service';
import { PrismaClient, Post, User } from '@prisma/client';

    let userResult: any;
  describe('Post Service', () => {
    let prisma: PrismaClient;

  
    beforeAll(async() => {
      prisma = new PrismaClient();
      const email = 'test@example.com';
      prisma.user.findUnique = jest.fn().mockResolvedValue({
          name: 'Test User',
          email: 'test@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
          } as User | null);
      
      userResult = await findUser(email);

    });
  
    afterAll(async () => {
      await prisma.$disconnect();
    });
  
    it('should create a post', async () => {
    
      const postData = {
        title: 'Test Post',
        content: 'This is a test post content',
        userId: userResult?.id || "123"
      };
  
      prisma.post.create = jest.fn().mockResolvedValue({
        id: 'post123',
        title: 'Test Post',
        content: 'This is a test post content',
        userId: 'user123',
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      const result = await createPostService(postData);
      expect(result?.title).toBe('Test Post');
    });
  
    it('should get all posts for a user', async () => {
      const userId = userResult.id;
  
      prisma.post.findMany = jest.fn().mockResolvedValue([
        {
          id: 'post1',
          title: 'Test Post 1',
          content: 'This is test post content 1',
          userId: 'user123',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'post2',
          title: 'Test Post 2',
          content: 'This is test post content 2',
          userId: 'user123',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as Post[]);
  
      const result = await getAllPostsService(userId);
      expect(result).toHaveLength(5);
    });

  });
  