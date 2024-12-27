docker compose up -d
echo '🟡 - Waiting for database to be ready...'
scripts/wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5433/postgres" -- echo '🟢 - Database is ready!'
cd packages/db
npx prisma migrate dev --name init
cd ../..
cd apps/webhook-handler
npm run test
cd ../..
docker compose down