# Syntecxhub Task Manager App

A full-stack task management application built with React and Node.js, designed to help users organize, track, and manage their tasks efficiently.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Development](#development)
- [Building for Production](#building-for-production)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 🎯 Overview

The Syntecxhub Task Manager App is a modern web application that enables users to create, organize, and track tasks with ease. With an intuitive user interface and robust backend infrastructure, this application provides a seamless task management experience.

## ✨ Features

- ✅ **Create Tasks** - Add new tasks with titles and descriptions
- ✅ **Update Tasks** - Edit task details and status
- ✅ **Delete Tasks** - Remove completed or unnecessary tasks
- ✅ **Task Filtering** - Filter tasks by status (pending, completed, etc.)
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Real-time Updates** - Immediate task status updates
- ✅ **User-friendly Interface** - Intuitive UI built with React

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.5 - UI library
- **Vite** 8.0.10 - Build tool and dev server
- **ESLint** 10.2.1 - Code quality and linting
- **React DOM** 19.2.5 - React rendering engine

### Backend
- **Node.js** - JavaScript runtime
- **CommonJS** - Module system

### Development Tools
- React Hooks ESLint Plugin
- Vite React Plugin for fast HMR

## 📁 Project Structure

```
Syntecxhub_Task_manager_app/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/
│   ├── src/
│   ├── package.json
│   └── index.js
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v7.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Shahriyar-Rahim/Syntecxhub_Task_manager_app.git
cd Syntecxhub_Task_manager_app
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file for environment variables (if needed):
   ```
   PORT=5000
   NODE_ENV=development
   ```

### Frontend Configuration

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Configure API endpoint (usually in a config or environment file):
   ```javascript
   const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
   ```

## ▶️ Running the Application

### Option 1: Run Backend and Frontend Separately

#### Start Backend Server

```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

#### Start Frontend Dev Server (in a new terminal)

```bash
cd frontend
npm run dev
# Application runs on http://localhost:5173
```

### Option 2: Run Concurrently

Create a `package.json` in the root directory with:

```json
{
  "scripts": {
    "dev": "concurrently \"npm --prefix backend start\" \"npm --prefix frontend run dev\""
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```

Then run:
```bash
npm run dev
```

## 💻 Development

### Available Scripts

#### Frontend

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint for code quality
npm run lint
```

#### Backend

```bash
# Start the server
npm start

# Run tests (when configured)
npm test
```

### Code Style

- The project uses ESLint for maintaining code quality
- Run `npm run lint` in the frontend directory to check code style
- Fix auto-fixable issues with `npm run lint -- --fix`

## 🏗️ Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Backend Build

Ensure all dependencies are installed:

```bash
cd backend
npm install
```

## 📚 API Documentation

*Add your API endpoints documentation here. Example:*

```
GET    /api/tasks         - Get all tasks
POST   /api/tasks         - Create a new task
GET    /api/tasks/:id     - Get task by ID
PUT    /api/tasks/:id     - Update task by ID
DELETE /api/tasks/:id     - Delete task by ID
```

*Detailed endpoint specifications, request/response formats, and authentication details should be documented here.*

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
   ```bash
   git clone https://github.com/Shahriyar-Rahim/Syntecxhub_Task_manager_app.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make your changes**
   - Write clean, well-commented code
   - Follow the existing code style
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Submit a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please:

- Open an [Issue](https://github.com/Shahriyar-Rahim/Syntecxhub_Task_manager_app/issues)
- Contact the maintainer: [Shahriyar-Rahim](https://github.com/Shahriyar-Rahim)
- Check existing documentation and FAQs

## 📝 Changelog

### v1.0.0 (2026-04-30)
- Initial release
- Basic task CRUD operations
- React frontend with Vite
- Node.js backend setup

---

**Happy task managing! 🎉**

*Last updated: 2026-04-30*