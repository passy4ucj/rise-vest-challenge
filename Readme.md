a RESTful API using Node.js, Express, TypeScript, and an SQL database (preferrably PostgreSQL).

1. Database Design & Setup:

Design a database with three tables: Users, Posts, and Comments. Users can have multiple posts, and each post can have multiple comments.
Implement necessary indexing for anticipated query performance.
2. API Development:

Endpoints to:
Create and retrieve users (/users).
Create a post for a user and retrieve all posts of a user (/users/:id/posts).
Add a comment to a post (/posts/:postId/comments).
Fetch the top 3 users with the most posts and, for each of those users, the latest comment they made. This should be achieved with efficient querying.
3. Query Optimization Task:

Optimize the following SQL query related to the designed schema:
```
SELECT users.id, users.name, posts.title, comments.content
FROM users
LEFT JOIN posts ON users.id = posts.userId
LEFT JOIN comments ON posts.id = comments.postId
WHERE comments.createdAt = (SELECT MAX(createdAt) FROM comments WHERE postId = posts.id)
ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.userId = users.id) DESC
LIMIT 3;
```

The query attempts to fetch the top 3 users with the most posts and, for each of those users, the latest comment they made. However, it's inefficient and needs optimization.

4. Middleware & Error Handling:

Implement a simple token-based authentication middleware.
Add basic validation for input data.
Implement error handling for the main API routes.