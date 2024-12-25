"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";
import { randomUUID } from "node:crypto";

export default async function createOnRampTxn(amount:number,provider:any){
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token = randomUUID();
    if(!userId){
        return{
            message:"User Not logged In"
        }
    }
    try{
        await prisma.onRamping.create({
            data:{
                userId:Number(userId),
                amount,
                status:"Processing",
                startTime:new Date(),
                token:token,
                provider
            }
        })
    }catch(e){
        return {
            message:"Something Went Wrong!!"
        }
    }
}