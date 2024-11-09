# Speedcast Challenge

This Next 14 project is the requested app for ve2max. It adheres to best practices and coding principles, while also following the guidelines provided in the challenge.
I have used Next 14 alongside Typescript, TailwindCSS, Prisma, TRPC, zod, Zustand, JWT and Postgres and shadcn/ui.

## Getting Started

Follow these steps to clone the repository and start the development server.

### Prerequisites

Make sure you have the following installed on your machine:

- Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

### Installation

1. **Clone the repository:**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/GFilippos/speedcast-challenge.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd ve2max-project
   ```

3. **Install dependencies:**

   If you're using `npm`, run:

   ```bash
   npm install
   ```

   Or if you're using `yarn`, run:

   ```bash
   yarn install
   ```

   Or if you're using `pnpm`, run:

   ```bash
   pnpm install
   ```

### Running the Application

1. **Start the development server:**

   If you're using `npm`, run:

   ```bash
   npm run dev
   ```

   Or if you're using `yarn`, run:

   ```bash
   yarn run dev
   ```

   Or if you're using `pnpm`, run:

   ```bash
   pnpm run dev
   ```

2. **Open the application in your browser:**

   After starting the development server, open your browser and go to:

   ```
   http://localhost:3000
   ```

3. **Setup prisma :**

   To initialize the user data in your database, run the following command:

   ```
   pnpm prisma db seed
   ```

4. **Postgres Configuration:**

   I have included a `.env` file for your convenience, which is configured to connect to my PostgreSQL instance. You can use this instance directly, or you are welcome to change it to point to your own PostgreSQL setup.

   If you prefer to use a local PostgreSQL instance, you can easily set one up using Docker. Below is a basic example of how to configure PostgreSQL using Docker Compose:

   ```yaml
   version: '3.8'

   services:
     postgres:
       image: postgres:latest
       environment:
         POSTGRES_USER: your_username
         POSTGRES_PASSWORD: your_password
         POSTGRES_DB: your_database
       ports:
         - '5432:5432'
       volumes:
         - postgres_data:/var/lib/postgresql/data

   volumes:
     postgres_data:
   ```

### License

This project is for Ve2max and is not licensed for general use.
