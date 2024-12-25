"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export default async function createP2PTransfer(phoneNumber:string,amount:number){
    const session = await getServerSession(authOptions);
    const from = session.user.id;
    if(!from){
        return {
            message:"Login Again!!"
        }
    }
    const to = await prisma.user.findFirst({
        where:{
            number:phoneNumber
        }
    })
    if(!to){
        return {
            message:"User Not Found!!"
        }
    }
    try{
        await prisma.$transaction(async(db)=>{
            const balance = await prisma.balance.findUnique({
                where:{
                    userId:Number(from)
                }
            })
            if(!balance || balance.amount < amount){
                return {
                    message:"Not Enough Funds"
                }
            }
            await db.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
              });
    
              await db.balance.upsert({
                where: { userId: to.id },
                update: {
                    amount: { increment: amount },
                },
                create: {
                    userId: to.id,
                    amount: amount,
                    locked:0
                }
            });
            await db.p2PTransfers.create({
                data:{
                    timestamp:new Date(),
                    sentUserId: Number(from),
                    recievedUserId: to.id
                }
            })
        })
    }catch(e){
        console.log("P2P Transaction Error",e);
        return {
            message:"Something Went Wrong!!"
        }
    }
}