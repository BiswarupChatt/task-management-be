# Task Management Tool - MERN Stack Backend

## Overview
Welcome to the backend implementation of our comprehensive task management application! This project, developed using the MERN (MongoDB, Express.js, React, Node.js) stack, provides robust APIs and functionalities to manage user authentication, task management, notifications, and security.

## Features
- **User Authentication**: Effortlessly handle user registration and login with JWT-based session management.
- **Task Management APIs**: Seamlessly manage tasks with CRUD operations through our RESTful APIs.
- **Notifications**: Stay updated with email notifications for task assignments.
- **Role-Based Access Control**: Ensure data security with middleware enforcing different access levels based on user roles.
- **API Documentation**: Dive into our well-documented API endpoints using Postman tool.

## Backend
Our backend is powered by Node.js and Express.js, offering a solid foundation for handling server-side operations. We've implemented top-notch security practices, including password hashing with bcrypt and route protection with JWT, to safeguard user data and interactions.

## Documentation
- **README.md**: Your go-to guide for setting up, understanding, and utilizing the backend functionalities.
- **API Documentation**: Our API endpoints are thoroughly documented to provide clear guidance on usage and functionality. You can access the API documentation guide [here](https://documenter.getpostman.com/view/25726372/2sA3JKe2xH).

### Setup Instructions
1. Clone this repository: `git clone https://github.com/BiswarupChatt/task-management-fe.git`
2. Install dependencies: `npm install`
3. Set up environment variables.
4. Start the server: `nodemon index.js`

### Project Overview

Our project is a backend implementation for a task management application built using the MERN stack. Here's a breakdown of its key components and functionalities:

#### Core Modules:

1. **Express Setup**: We've configured the Express.js framework to handle HTTP requests and responses. This includes middleware like `express.json()` for parsing JSON request bodies, `morgan` for logging HTTP requests, and `cors` for enabling Cross-Origin Resource Sharing.

2. **Database Configuration**: We've set up a connection to the database using Mongoose, a MongoDB object modeling tool. The `configureDB()` function initializes the database connection.

#### Controllers:

1. **User Controller (`userCtrl`)**: Manages user-related operations such as registration, login, updating user details, and deleting user accounts.

2. **Task Controller (`taskCtrl`)**: Handles task-related operations including creating tasks, fetching tasks, updating task statuses, updating task details, and deleting tasks.

3. **Comment Controller (`commentCtrl`)**: Responsible for CRUD operations related to comments on tasks, including creating, fetching, editing, and deleting comments.

4. **Time Log Controller (`timeCtrl`)**: Manages time log-related operations such as adding time logs, fetching time logs by task, updating time logs, and deleting time logs.

#### Validations:

1. **User Validations**: Validates user input data for user registration, login, and updating user details.

2. **Task Validations**: Ensures the integrity of task-related data, including task creation and status updates.

3. **Comment Validations**: Validates comment data to maintain consistency and prevent invalid input.

4. **Time Log Validations**: Ensures that time log data is valid before performing CRUD operations on time logs.

#### Middleware:

1. **Authentication Middleware (`authenticateUser`)**: Authenticates users by verifying JWT tokens, ensuring that only authenticated users can access protected routes.

2. **Authorization Middleware (`authorizeUser`)**: Authorizes users based on their roles and permissions, restricting access to certain endpoints.

#### API Endpoints:

We've defined various RESTful API endpoints to interact with the backend:

- **User Endpoints**: Handles user registration, login, account details, updates, and deletion.
- **Task Endpoints**: Manages tasks, including creation, retrieval, status updates, updates, and deletion.
- **Comment Endpoints**: Handles comments on tasks, including creation, retrieval, editing, and deletion.
- **Time Log Endpoints**: Manages time logs for tasks, including creation, retrieval by task, updating, and deletion.

#### Server Initialization:

Finally, we've configured the server to listen for incoming requests on the specified port (`process.env.PORT`) and log a message indicating successful server startup.

With these components in place, our backend provides a robust foundation for the task management application, ensuring efficient data management, user authentication, authorization, and validation.



### Usage Guide
1. Fire up the server with `node index.js` or `nodemon index.js`.
2. Utilize Postman or a similar tool to interact with our feature-rich API endpoints.
3. Consult our API documentation for comprehensive details on each endpoint.

## Deliverables
We've meticulously crafted this backend, and here are the deliverables you can expect:
- Source code residing in a Git repository.
- README.md, your ultimate companion for setup instructions and project insights.

Thank you for choosing our task management tool's backend solution. Happy coding!
