# BackGA
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/marquineo/BackGA)

BackGA is the backend API for GymBroAnalytics, a fitness application designed to connect trainers and clients. It provides a robust system for managing users, creating personalized training routines, tracking physical progress, and facilitating communication.

Built with the Laravel framework, this repository contains all the necessary components to run the server-side logic of the application.

## Key Features

*   **Multi-Role User System**: Supports `admin`, `entrenador` (trainer), and `cliente` (client) roles with distinct functionalities.
*   **User Management**: Full CRUD capabilities for trainers, clients, and administrators.
*   **Trainer & Client Dashboard Support**: Endpoints to fetch data specific to trainer and client dashboards, such as client lists for trainers.
*   **Personalized Training Routines**: Trainers can create, update, and assign detailed training routines to their clients. Routines include exercises with specified sets, reps, rest times, and RPE.
*   **Physical Progress Tracking**: Clients can log their physical metrics over time, including weight, body fat percentage, and various circumferences. The API provides endpoints to visualize this progress.
*   **Workout Scheduling**: Exercises can be assigned to specific dates, allowing clients to see their workout plan for any given day.
*   **Email Notifications**: Integrated with Sendinblue to automatically send emails for significant events, such as when a new client registers or a new routine is assigned.
*   **Image Uploads**: Support for uploading and storing profile pictures for users.
*   **Containerized Deployment**: Includes a `Dockerfile` for easy setup and deployment using Docker.

## Built With

*   [Laravel 11](https://laravel.com/)
*   [PHP 8.2](https://www.php.net/)
*   [PostgreSQL](https://www.postgresql.org/)
*   [Sendinblue (Brevo)](https://www.brevo.com/) for transactional emails
*   [Docker](https://www.docker.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   PHP >= 8.2
*   Composer
*   PostgreSQL Database

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/marquineo/BackGA.git
    cd BackGA
    ```

2.  **Install PHP dependencies:**
    ```sh
    composer install
    ```

3.  **Create and configure the environment file:**
    Copy the example environment file and generate an application key.
    ```sh
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Configure your `.env` file:**
    Update the database connection details (`DB_*`) and mailer settings to match your local environment.
    ```ini
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=your_database
    DB_USERNAME=your_username
    DB_PASSWORD=your_password

    MAIL_MAILER=log
    MAIL_FROM_ADDRESS=hello@example.com
    MAIL_FROM_NAME="${APP_NAME}"
    ```

5.  **Run database migrations:**
    This will create all the necessary tables in your database.
    ```sh
    php artisan migrate
    ```

6.  **Create the storage link:**
    This makes uploaded files (like profile pictures) publicly accessible.
    ```sh
    php artisan storage:link
    ```

7.  **Start the development server:**
    ```sh
    php artisan serve
    ```
    The API will be available at `http://127.0.0.1:8000`.

## Docker Setup

You can also run the application within a Docker container.

1.  **Build the Docker image:**
    ```sh
    docker build -t backga .
    ```

2.  **Run the container:**
    This command will start the application and map port 10000 on your host to port 10000 in the container.
    ```sh
    docker run -p 10000:10000 -d --name backga-container -v $(pwd):/var/www/html backga
    ```
    Ensure your `.env` file is configured to connect to your database from within the Docker network. The API will be accessible at `http://localhost:10000`.

## API Endpoints

The API provides a set of RESTful endpoints to manage the application's data.

| Method | Endpoint                                        | Description                                        |
| :----- | :---------------------------------------------- | :------------------------------------------------- |
| **Auth** | | |
| POST   | `/api/users/login`                              | Authenticate a user and get their role and ID.     |
| POST   | `/api/users/registrar/cliente`                  | Register a new client.                             |
| POST   | `/api/users/registrar/entrenador`               | Register a new trainer.                            |
| **Users** | | |
| GET    | `/api/users/{trainer_id}/clientes`              | Get all clients assigned to a specific trainer.    |
| POST   | `/api/users/clientes/atletas/{id}/actualizar`   | Update a client's profile information.             |
| GET    | `/api/users/entrenadores`                       | Get a list of all trainers.                         |
| POST   | `/api/users/{usuario_id}/actualizar/entrenador` | Update a trainer's profile information.            |
| **Routines** | | |
| PUT    | `/api/rutinas/cliente/{clienteId}`              | Create or update a training routine for a client.  |
| GET    | `/api/rutinas/{clienteId}`                      | Get all routines for a specific client.            |
| GET    | `/api/rutinas/entrenamientos/{clienteId}`       | Get a client's scheduled workout for a given date. |
| POST | `/api/rutinas/clientes/{clienteId}/rutinas/eliminar` | Delete specified routines for a client. |
| **Progress** | | |
| POST   | `/api/progresos/guardar/{clienteId}`            | Save a new physical progress entry for a client.   |
| GET    | `/api/progresos/{clienteId}`                    | Get all physical progress entries for a client.    |
| DELETE | `/api/progresos/eliminar/{id}`                  | Delete a specific physical progress entry.         |
