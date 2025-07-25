# Sprintpilot

## Overview

Sprintpilot is a project management tool of choice for developers around the world to improve real-time collaboration.

## Technologies Used

- Typescript
- Bun + Hono (API)
- React + Tanstack Router (UI)
- Docker
- MySQL

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (v1.0 or later)
- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js](https://nodejs.org/) (for UI development, optional if using Bun only)
- [MySQL](https://www.mysql.com/) (if not using Docker for DB)

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```sh
git clone git@github.com:margusliinev/sprintpilot.git
cd sprintpilot
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with the following contents.

```
PORT='3000'
NODE_ENV='development'
DATABASE_URL='mysql://user:password@localhost:3306/db'
SESSION_SECRET='secret'
```
Create a `.env.test` file in the root directory with the following contents.

```
PORT='4000'
NODE_ENV='test'
DATABASE_URL='mysql://user:password@localhost:3307/db_test'
SESSION_SECRET='test_secret'
```

### 3. Install Dependencies

Install dependencies for both API and the UI:

```sh
cd ui && bun install && cd .. && bun install
```

### 4. Start the Project

Start the required services and the development server:

```sh
docker compose up -d
bun --filter '*' dev
```

### 5. Run Tests

To run the test suite:

```sh
bun run test
```

### 6. Deploy to Production

Build and start the project for production:

```sh
bun --filter '*' build
bun run start
```

## Contributing

Feel free to contribute by opening issues or submitting pull requests.

## Support

For questions or support, open an issue in this repository.

## License

This project is licensed under the [MIT License](LICENSE).
