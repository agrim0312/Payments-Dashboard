#!/bin/bash

# Start from the project root
PROJECT_ROOT=$(pwd)

# Start docker containers
echo "Starting Docker containers..."
docker compose up -d

# Run database migrations and seeding
echo "Setting up database..."
cd packages/db
npx prisma migrate dev
npx prisma db seed

# Start the development server in the background
echo "Starting development server..."
cd $PROJECT_ROOT/apps/user-app
npm run dev > dev-server.log 2>&1 &
DEV_SERVER_PID=$!

# Wait for the dev server to be ready
echo "Waiting for development server to start..."
while ! nc -z localhost 3001; do   # Adjust port if your dev server uses a different one
  sleep 1
done

# Run Cypress tests
echo "Running Cypress tests..."
npx cypress run --browser chrome --headless
CYPRESS_EXIT_CODE=$!

# Kill the development server
kill $DEV_SERVER_PID

# Return to project root and stop Docker
cd $PROJECT_ROOT
docker compose down

# Exit with Cypress's exit code
exit $CYPRESS_EXIT_CODE