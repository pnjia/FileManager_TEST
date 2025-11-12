# GEMINI.md

## Project Overview

This is a full-stack file manager web application. It allows users to create, rename, and delete folders, as well as upload, view, and delete files.

The application is composed of two main parts:

*   **Frontend:** A single-page application built with React, Vite, and Tailwind CSS. It provides the user interface for managing files and folders.
*   **Backend:** A REST API built with Node.js, Express, and Prisma. It handles the business logic for file and folder operations, and interacts with a database to store the file and folder metadata.

## Building and Running

### Backend

To run the backend server, follow these steps:

1.  Navigate to the `backend` directory.
2.  Install the dependencies: `npm install`
3.  Start the development server: `npm run dev` (Note: The `dev` script is not defined in the provided `package.json`. This is a placeholder and needs to be added.)

**TODO:** Add a `dev` script to `backend/package.json` that runs the server with a tool like `nodemon`.

### Frontend

To run the frontend application, follow these steps:

1.  Navigate to the `frontend` directory.
2.  Install the dependencies: `npm install`
3.  Start the development server: `npm run dev`

The application will be available at `http://localhost:5173` by default.

## Development Conventions

### Backend

*   The backend follows a standard Node.js/Express project structure.
*   Routes are defined in the `src/routes` directory.
*   Controllers in `src/controllers` handle the request and response logic.
*   Services in `src/services` contain the business logic.
*   Prisma is used as the ORM for database interactions. The schema is defined in `prisma/schema.prisma`.

### Frontend

*   The frontend is a React application built with Vite.
*   Components are located in the `src/components` directory.
*   API calls to the backend are managed in the `src/services` directory.
*   The main application component is `src/App.jsx`.
*   Styling is done with Tailwind CSS.
