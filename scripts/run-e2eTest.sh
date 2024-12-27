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


cd $PROJECT_ROOT/apps/user-app
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