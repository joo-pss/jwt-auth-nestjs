# JWT Authentication

## Description
This project is an API built with NestJS and TypeScript, implementing a JWT authentication system. It provides login and registration routes, as well as private routes for updating, deleting, and retrieving user account information. PostgreSQL is used as the database, with Prisma as the ORM. Bcryptjs is employed for hashing account passwords, ensuring the security of stored information. Unit tests are conducted using Jest, and compilation is optimized with SWC.

## Technologies Used

- TypeScript
- NestJS
- JWT
- Prisma
- PostgreSQL
- Jest

## Endpoints 

- POST /auth/signup
- POST /auth/signin
- GET /accounts
- PATCH /accounts
- DELETE /accounts
