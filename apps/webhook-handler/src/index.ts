import db from "@repo/db/client";
import express from "express";

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn
    try{
        await db.$transaction([
            db.balance.upsert({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                update:{
                    amount:{
                        increment:Number(paymentInformation.amount),
                    }
                },
                create:{
                    userId:Number(paymentInformation.userId),
                    amount:Number(paymentInformation.amount),
                    locked:0
                }
            }),
            db.onRamping.updateMany({
                where:{
                    token:paymentInformation.token
                },
                data: {
                    status: "Successful",
                }
            })
        ]);
        res.status(200).json({
            message: "Captured"
        })
    }catch(e){
        console.log("HDFC webhook handler Error",e);
        res.status(411).send("Something went wrong");
    }
})

app.listen(3003);