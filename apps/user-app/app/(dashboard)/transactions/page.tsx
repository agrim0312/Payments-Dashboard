import { getServerSession } from "next-auth";
import { P2PTransferTable } from "../../components/P2PTxns";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

const useFetchTransactions = async () => {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    
        const txns = await prisma.p2PTransfers.findMany({
            where:{
                OR:[
                    {
                        sentUserId:Number(userId)
                    },
                    {
                        recievedUserId:Number(userId)
                    }
                ]
            },
            select:{
                sentUser:true,
                recievedUser:true,
                id:true,
                timestamp:true,
                recievedUserId:true,
                sentUserId:true
            }
        })
        return txns.map(t=>({
            timestamp:t.timestamp?.toString() || "",
            id:t.id,
            sentUser:{
                id:t.sentUserId,
                name:t.sentUser.name || ""
            },
            recievedUser:{
                id:t.recievedUserId,
                name:t.recievedUser.name || ""
            }
        }));
}

export default async function() {
    const transactions = await useFetchTransactions();
    return (
        <P2PTransferTable Transactions={transactions}/>
    ) 
}