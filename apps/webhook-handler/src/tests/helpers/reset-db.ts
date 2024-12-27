import prisma from "@repo/db/client"

export default async () => {
  await prisma.$transaction([
    prisma.balance.deleteMany(),
    prisma.merchant.deleteMany(),
    prisma.onRamping.deleteMany(),
    prisma.p2PTransfers.deleteMany(),
    prisma.user.deleteMany()
  ])
}