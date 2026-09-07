# WealthWise: A Personal Finance Tracker

---

# DECLARATION

We, the undersigned members of **Team Logic Legends** — Riya Mangal, Dhruv Sharda, Tanu Mangal, Yatharth Dubey and Animesh Pandey — hereby declare that the project synopsis entitled **"WealthWise: A Personal Finance Tracker"** is an original record of our own work, carried out under the guidance of **Mr. Akash Kumar Choudhary, Master Trainer, GLA University**.

This work has not been submitted elsewhere for the award of any other degree or diploma.

---

# ACKNOWLEDGEMENT

We would like to express our sincere gratitude to **Mr. Akash Kumar Choudhary**, our Master Trainer, for his valuable guidance and constant encouragement throughout this project.

We also thank the **Department of Computer Science, GLA University**, for providing the resources and support needed to carry out this project.

---

# CERTIFICATE

This is to certify that the project entitled **"WealthWise: A Personal Finance Tracker"** has been carried out by:

- Riya Mangal
- Dhruv Sharda
- Tanu Mangal
- Yatharth Dubey
- Animesh Pandey

under the supervision and guidance of **Mr. Akash Kumar Choudhary**.

**Team:** Logic Legends

**Signature of Guide:** Mr. Akash Kumar Choudhary

**Date:** ______________

---

# TABLE OF CONTENTS

| S.No. | Topic |
|------:|-------|
| 1 | Introduction |
| 2 | System Requirements |
| 3 | Hardware Requirements |
| 4 | Frontend and Backend |
| 5 | Idea |
| 6 | Objective |
| 7 | Module Description |
| 8 | Availability |
| 9 | ER Diagram |
| 10 | Bibliography |
| 11 | References |

---

# INDEX

This index is a reference for the project synopsis only.

---

# INTRODUCTION

**WealthWise** is a full-stack personal finance management web application built on the **MERN Stack**:

- MongoDB
- Express.js
- React.js
- Node.js

Manual tracking of income and expenses through notebooks or spreadsheets is often slow and error-prone.

WealthWise provides users with one secure platform to:

- Record financial transactions
- Track income and expenses
- Set savings goals
- Categorize transactions
- Understand spending patterns
- View financial information through visual dashboards

---

# ABOUT THE PROJECT

- Built for individuals who want a simple and secure way to manage day-to-day income, expenses and savings.
- Uses React.js for the user interface.
- Uses Node.js and Express.js for the REST API.
- Uses MongoDB for data storage.
- Provides secure user authentication.
- Supports transaction categorization.
- Provides budget tracking and visual reports.
- Developed following clean coding practices.
- Uses modular REST API design.
- Uses Git and GitHub for version control.
- Designed to be extendable for future modules such as bill reminders and bank-account synchronization.

---

# PRIMARY REASON TO CHOOSE THIS PROJECT

- Personal finance management is a real-world and high-demand fintech problem with genuine practical value.
- The project provides hands-on experience with the complete MERN Stack, from database development to user interface development.
- It builds practical skills in REST API design and authentication.
- It provides experience with Git and GitHub workflows.
- Data visualization adds an interactive and useful front-end component to the project.

---

# MAIN OBJECTIVE OF THE PROJECT

The main objectives of WealthWise are:

- To allow users to record and categorize income and expenses easily.
- To help users set, track and achieve personal savings goals.
- To present spending patterns and financial health through charts and dashboards.
- To provide secure authentication and safe storage of financial data.
- To apply clean coding practices and REST API design principles.
- To use Git and GitHub for version control and project collaboration.

---

# SCOPE OF THE PROJECT

The project includes the following features:

- Income and expense tracking.
- Custom transaction categories such as food, rent and travel.
- Savings-goal creation.
- Savings progress tracking.
- Monthly spending analysis.
- Category-wise expense breakdown.
- Financial trends through dashboards and charts.
- Secure registration and login using JWT-based authentication.

## Future Scope

Future versions of WealthWise may include:

- Multi-currency support.
- Bank-account integration.
- Bill reminders.
- Tax reports.
- Advanced financial analytics.

---

# WORKING METHODOLOGY

The project follows the following development methodology:

1. Requirement analysis and project planning.
2. Database schema design.
3. REST API endpoint design.
4. UI/UX design for dashboards and forms.
5. Development of reusable React components.
6. Backend development using Node.js, Express.js and MongoDB.
7. Integration of the React frontend with backend REST APIs.
8. Iterative Agile-style development using short development cycles.
9. Regular team reviews and testing.
10. Version control and collaboration using Git and GitHub.
11. API testing using Postman.
12. Manual user interface testing before deployment.

---

# SYSTEM REQUIREMENTS

## Supported Operating System

The application can run on:

- Windows 10
- Windows 11
- macOS
- Linux

Any operating system capable of running a modern web browser and Node.js can be used.

---

# SOFTWARE REQUIREMENTS

The following software and technologies are required:

- Node.js
- npm
- MongoDB
- MongoDB Atlas
- Visual Studio Code
- Git
- GitHub
- Postman
- Modern Web Browser

---

# HARDWARE REQUIREMENTS

Minimum hardware requirements:

- Dual-core processor
- 4 GB RAM
- Approximately 500 MB free storage
- Stable internet connection

---

# TESTING TECHNOLOGIES

The project can be tested using:

- Postman for REST API testing.
- Manual UI testing for frontend components.
- Jest for unit testing.
- React Testing Library for testing React components.

---

# FRONTEND AND BACKEND

## Frontend

The frontend is responsible for the user interface and user interaction.

### Technologies Used

- React.js
- React Router
- Context API
- Axios
- Chart.js or Recharts
- Tailwind CSS

---

## Backend

The backend is responsible for business logic, API development and database operations.

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt for password hashing

---

# MODULE DESCRIPTION

## 1. User Authentication

Provides secure:

- User registration
- User login
- JWT-based authentication
- Session management

---

## 2. Income and Expense Management

Allows users to:

- Add transactions
- Edit transactions
- Delete transactions
- Categorize income and expenses

---

## 3. Budget and Savings Goals

Allows users to:

- Set monthly budgets
- Create savings goals
- Track financial progress

---

## 4. Profile and Settings

Allows users to manage:

- Account details
- Transaction categories
- User preferences

---

# DATA FLOW DIAGRAM

The Data Flow Diagram represents the movement of data between users, the frontend application, backend services and the database.

The main flow is:

```text
User
  ↓
React Frontend
  ↓
REST API
  ↓
Node.js + Express.js Backend
  ↓
MongoDB Database
