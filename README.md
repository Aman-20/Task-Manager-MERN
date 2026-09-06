# Task Manager (MERN)

A full-stack task management app with JWT-based authentication, built with MongoDB, Express, React, and Node.js. Users can sign up, log in, and manage their own tasks (create, read, update, delete).

🔗 **Live demo:** [task-manager-mern-umber.vercel.app](https://task-manager-mern-umber.vercel.app)

## Features

- User signup, login, and logout with JWT stored in HTTP-only cookies
- Protected routes — task endpoints require authentication
- Create, view, update, and delete tasks
- Bulk deletion of multiple tasks
- Each task is linked to the user who created it

## Tech Stack

**Frontend**
- React 19
- React Router
- Vite

**Backend**
- Node.js
- Express 5
- MongoDB with Mongoose
- JSON Web Token (JWT) for auth
- bcrypt for password hashing
- cookie-parser, cors, dotenv

## Project Structure

```
Task-Manager-MERN/
├── backend/
│   ├── controller/     # Route handlers (user, task)
│   ├── middleware/      # checkAuth middleware
│   ├── model/           # Mongoose schemas (User, Task)
│   ├── router/          # Express routers (user, task)
│   ├── service/         # JWT helper functions
│   ├── connection.js     # MongoDB connection
│   └── index.js          # App entry point
└── frontend/
    └── src/               # React application
```

## API Endpoints

### Auth (`/`)
| Method | Endpoint  | Description                      | Auth required |
|--------|-----------|-----------------------------------|:---:|
| GET    | `/me`     | Get the logged-in user's info     | ✅ |
| POST   | `/signup` | Register a new user               | ❌ |
| POST   | `/login`  | Log in and receive a JWT cookie   | ❌ |
| GET    | `/logout` | Log out and clear the token       | ✅ |

### Tasks (`/task`)
All task routes require authentication.

| Method | Endpoint                 | Description                  |
|--------|---------------------------|-------------------------------|
| GET    | `/task`                   | Get all tasks for the user    |
| POST   | `/task/add`                | Create a new task             |
| GET    | `/task/:id`                | Get a single task by ID       |
| PUT    | `/task/update/:id`         | Update a task by ID           |
| DELETE | `/task/delete/:id`         | Delete a task by ID           |
| DELETE | `/task/delete-multiple`    | Delete multiple tasks at once |

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB database (local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Aman-20/Task-Manager-MERN.git
cd Task-Manager-MERN
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following variables:
```
PORT=3000
MONGO_URL=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
npm start
```

### 3. Set up the frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` and the backend at `http://localhost:3000` (or whichever `PORT` you set).

## License

ISC
