import { getServerSession } from "next-auth";
import Dashboard from "../../components/DashboardPage";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";



const getUser = async ()=>{
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const user = await prisma.user.findFirst({
        where:{
            id:Number(userId)
        },
        include:{
            Balance:{
                where:{
                    userId:Number(userId)
                },
                select:{
                    amount:true,
                    timestamp:true
                }
            }
        },
    })
    return {
        name: user?.name || "",
        Balance: user?.Balance?.map(balance => ({
            ...balance,
            date: balance.timestamp ? balance.timestamp.toString() : "",
            value: balance.amount
        })) || []
    };
}

export default async function () {
    
    const user = await getUser();
    return <div className="w-screen">
         <Dashboard user={user}/>
    </div>
}