# GymBroAnalytics Frontend

This is the official Angular frontend for GymBroAnalytics, a comprehensive fitness platform designed to connect personal trainers with their clients. It provides an interactive and user-friendly interface for managing training routines, tracking progress, and visualizing performance data.

This application is built as a client for the [BackGA (Laravel API)](https://github.com/marquineo/BackGA).

## Features

*   **Role-Based Dashboards**: Separate, feature-rich dashboards for Administrators, Trainers (`Entrenador`), and Clients (`Cliente`).
*   **Administrator Dashboard**: Provides tools to manage the platform's trainers, including adding new trainers, modifying their profiles, and managing their access.
*   **Trainer Dashboard**: Allows trainers to view and manage their assigned clients, add new athletes, and quickly access their training schedules and progress information.
*   **Client Dashboard**: Features an interactive calendar to display daily workout schedules. Clients can log physical progress (e.g., weight, body fat) and view their historical data through graphical charts.
*   **Dynamic Routine Management**: Trainers can create, edit, and assign complex training routines with specific exercises, sets, reps, rest times, and RPE (Rate of Perceived Exertion).
*   **Progress Visualization**: Clients and trainers can track physical evolution through line, bar, and radar charts that visualize key metrics over time.
*   **Secure Authentication**: A robust login system with role-based routing protected by authentication guards ensures that users can only access authorized sections.

## Tech Stack

*   **Framework**: [Angular 19](https://angular.io/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Bootstrap 5](https://getbootstrap.com/) & [Font Awesome](https://fontawesome.com/)
*   **Data Visualization**: [Chart.js](https://www.chartjs.org/) with [ng2-charts](https://valor-software.com/ng2-charts/)
*   **Calendar**: [angular-calendar](https://github.com/mattlewis92/angular-calendar)
*   **Notifications**: [ngx-toastr](https://github.com/scttcper/ngx-toastr)
*   **State Management**: [RxJS](https://rxjs.dev/)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm (v9 or later)
*   Angular CLI (`npm install -g @angular/cli`)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/marquineo/clientega.git
    cd clientega
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

**Note:** This application is a client for a backend API. The API endpoints are configured in the service files (e.g., `src/app/services/*.ts`) and point to `https://api.gymbroanalytics.xyz`. For local development, you may need to run the corresponding backend server and update these URLs to point to your local instance (e.g., `http://127.0.0.1:8000`).

## Available Scripts

In the project directory, you can run:

*   `ng serve`: Runs the app in development mode.
*   `ng build`: Builds the project for production. The build artifacts will be stored in the `dist/` directory.
*   `ng test`: Executes the unit tests via [Karma](https://karma-runner.github.io).
*   `npm start`: Runs a simple Express server to serve the production build from the `dist/` directory. This is useful for testing the production version locally.

## Deployment

This repository is pre-configured for deployment on several platforms:

*   **AWS Amplify**: The `amplify.yml` file contains the build and deployment configuration for continuous deployment with AWS Amplify.
*   **Node.js Environment**: The included `server.js` file provides a basic Express server to serve the static application. After building the project with `npm run build`, you can start the server using `npm start`.
*   **Replit**: The `.replit` file allows for easy setup and execution on the Replit platform.
