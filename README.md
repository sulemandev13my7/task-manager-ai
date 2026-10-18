# Task Manager Application - Complete Implementation

## Overview
This is a full-stack Task Manager application with AI-powered task planning capabilities, built as per the requirements. The project includes a Node.js/Express backend with MongoDB and a React frontend.

## Project Structure
```
task-manager-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── taskController.js
│   │   │   └── aiController.js
│   │   ├── models/
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── taskRoutes.js
│   │   │   └── aiRoutes.js
│   │   ├── middlewares/
│   │   └── server.js
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
└── docs/
```

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
- Copy `.env.example` to `.env`
- Update the following variables:
  - `MONGODB_URI`: Your MongoDB connection string
  - `GROQ_API_KEY`: Your Groq API key (get from https://console.groq.com/)

### 3. Get Groq API Key (for AI Integration)
1. Go to https://console.groq.com/
2. Sign up/login and navigate to API Keys
3. Create a new API key
4. Add it to your `.env` file

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

## API Endpoints

### Tasks CRUD
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a single task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### AI Task Planning
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/plan-task` | Generate AI task plan from description |

## Testing with Postman

### Create Task
```json
POST http://localhost:5000/api/tasks
{
  "title": "Learn React",
  "description": "Complete React basics",
  "status": "pending",
  "dueDate": "2026-10-20"
}
```

### Generate AI Plan
```json
POST http://localhost:5000/api/ai/plan-task
{
  "description": "I need to build a portfolio website within three days."
}
```

## Features
- ✅ Complete CRUD operations for tasks
- ✅ AI-powered task plan generation using Groq API
- ✅ Proper validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ CORS enabled
- ✅ Environment variable management
- ✅ Structured API responses
- ✅ Input validation (required fields, valid IDs, enum values)