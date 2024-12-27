import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {
      password: await bcrypt.hash('alice',10),
    },
    create: {
      number: '9999999999',
      password: await bcrypt.hash('alice',10),
      name: 'alice',
      onRamping: {
        create: {
          startTime: new Date(),
          status: "Successful",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
      Balance:{
        create: {
          amount:200000,
          locked:0,
          timestamp:new Date(),
        }
      }
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {
      password: await bcrypt.hash('bob',10)
    },
    create: {
      number: '9999999998',
      password: await bcrypt.hash('bob',10),
      name: 'bob',
      onRamping: {
        create: {
          startTime: new Date(),
          status: "Failed",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
      Balance:{
        create: {
          amount:20000,
          locked:0,
          timestamp:new Date(),
        }
      }
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })