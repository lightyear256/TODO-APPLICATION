# Todo App

This is a Node.js backend application using Express, MongoDB (via Mongoose), and JWT authentication to manage user signups, logins, and a simple todo list.

## Features
- User authentication with **bcrypt** password hashing
- Token-based authentication using **JWT**
- CRUD operations for managing todos
- Input validation using **Zod**
- Uses **MongoDB** for data storage

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/todo-app-backend.git
   cd todo-app-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the project root and add the following variables:
   ```env
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/todoapp
   SECRET_KEY=your_jwt_secret
   ```

4. Start the server:
   ```sh
   npm start
   ```
