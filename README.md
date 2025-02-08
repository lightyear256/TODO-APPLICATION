# Todo App (Full Stack)
# added some changes
This is a **full-stack** Todo application with a **Node.js backend** and a **frontend** served as static files.

## Features
- User authentication with **bcrypt** password hashing
- Token-based authentication using **JWT**
- CRUD operations for managing todos
- Input validation using **Zod**
- Uses **MongoDB** for data storage
- **Frontend UI** served via Express

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. Install backend dependencies:
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

## Frontend Setup
The frontend is stored in `public/` and served via Express.

### **To modify the frontend:**
1. Navigate to the `public/` folder:
   ```sh
   cd public
   ```
2. Modify `index.html`, `index2.html`, or other static assets as needed.
3. Restart the backend server if required.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (served via Express)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT, Bcrypt
- **Validation:** Zod


