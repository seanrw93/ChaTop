# ChâTop

ChâTop is a full-stack TypeScript application that connects tenants and property owners in a holiday rental area.

This repository contains the React front end, the resources needed for development, and the NestJS back end that replaces the supplied mock API.

## Getting started

### Requirements

- Node.js 22 LTS or later
- npm, which is included with Node.js
- MySQL 8.0 or later, or MariaDB 10.5 or later
- Mockoon Desktop, for simulating the API during front-end development

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd p3-dfsjs-starter
```

#### 2. Install and run the React front end

```bash
cd frontend
npm install
npm run dev
```

The front end runs at [http://localhost:5173](http://localhost:5173).

#### 3. Configure Mockoon

1. Download and install [Mockoon](https://mockoon.com/download/).
2. Open Mockoon.
3. Select **File > Open environment**.
4. Open `ressources/mockoon/chatop-api.json`.
5. Start the mock server by clicking the play button.

The mock API runs at [http://localhost:3001](http://localhost:3001).

#### 4. Create the MySQL database

Run the supplied schema:

```bash
mysql -u root -p < ressources/sql/schema.sql
```

You can also open `ressources/sql/schema.sql` in MySQL Workbench or DBeaver and run it there.

## Project structure

```text
p3-dfsjs-starter/
├── frontend/                # React 19 front end
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # Axios API services
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── ressources/
│   ├── mockoon/             # Mockoon environment
│   │   └── chatop-api.json
│   └── sql/                 # Database schema
│       └── schema.sql
│
└── README.md
```

## Setup tasks

### Set up the environment

- Install Mockoon.
- Start the React front end.
- Test the application against Mockoon.

### Review the Mockoon API

Identify every API route and document its:

- URL
- HTTP method
- Parameters
- Request body
- Responses

Also identify the main business entities: `User`, `Rental`, and `Message`.

### Set up the database

- Create the `chatop_db` database.
- Run the supplied SQL schema.
- Configure Prisma as part of the back-end implementation.

## Back-end requirements

The NestJS back end provides the following features.

#### Authentication routes

- `POST /api/auth/register`: create an account
- `POST /api/auth/login`: sign in and return a JWT
- `GET /api/auth/me`: return the authenticated user
- Hash passwords with bcrypt.
- Protect every route except registration, login, and Swagger.

#### API routes

- `GET /api/rentals`: return all rentals
- `GET /api/rentals/:id`: return one rental
- `POST /api/rentals`: create a rental, including an image upload
- `PUT /api/rentals/:id`: update a rental
- `GET /api/user/:id`: return a user
- `POST /api/messages`: send a message
- Use a controller, service, and Prisma data-access layer.
- Validate request DTOs with `class-validator`.

#### Documentation and finishing work

- Document the API with Swagger and `@nestjs/swagger`.
- Clean up the code.
- Add complete back-end setup and usage instructions to the README.

## Technologies

### Front end

- React 19
- TypeScript 5.7+
- Vite 6
- Tailwind CSS 3.4
- TanStack Query
- React Router 7
- Axios

### Back end

- NestJS
- TypeScript 5.7+ in strict mode
- Prisma with MySQL
- Passport and JWT for authentication
- bcrypt for password hashing
- `class-validator` for DTO validation
- `@nestjs/swagger` for OpenAPI documentation

## Resources

### Official documentation

- [NestJS documentation](https://docs.nestjs.com/)
- [Prisma documentation](https://www.prisma.io/docs/)
- [Passport JWT strategy](https://docs.nestjs.com/security/authentication#jwt-functionality)
- [Swagger and OpenAPI](https://docs.nestjs.com/openapi/introduction)

### Tools

- [Mockoon](https://mockoon.com/): mock API server
- [MySQL Workbench](https://www.mysql.com/products/workbench/): database GUI
- [Prisma Studio](https://www.prisma.io/studio): database browser
- [Postman](https://www.postman.com/): API testing

## Points to keep in mind

### Security

- Require a JWT for every route except registration, login, and Swagger.
- Hash passwords with bcrypt. Never store them in plain text.
- Keep database credentials in `.env`.
- Validate user input with DTOs and `class-validator`.

### Architecture

- Organise the application into NestJS modules.
- Use Prisma instead of raw SQL in the application code.
- Keep controllers, services, and data access separate.
- Handle errors with NestJS exceptions or exception filters.

### Image uploads

- Store rental images on the server.
- Save the resulting image URL in the database.
- Use NestJS `FileInterceptor` to handle uploads.

## Useful commands

### Front end

```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start the development server
npm run build        # Create a production build
npm run lint         # Check the code
```

### Back end

```bash
cd backend
npm install

# Install the main dependencies
npm install @nestjs/passport passport passport-jwt
npm install @nestjs/jwt bcrypt
npm install @prisma/client
npm install class-validator class-transformer
npm install @nestjs/swagger

# Install Prisma's command-line tool
npm install --save-dev prisma

# Initialise Prisma
npx prisma init

# Generate the Prisma client after configuring schema.prisma
npx prisma generate

# Start the development server
npm run start:dev
```

## Important

- Do not modify the front end unless the assignment specifically allows it.
- The front end communicates with the API at `http://localhost:3001`.
- All API calls use the `/api/*` prefix.
- The back end must return the response shapes expected by Mockoon and the front end.

## Version

1.0.0, January 2026
