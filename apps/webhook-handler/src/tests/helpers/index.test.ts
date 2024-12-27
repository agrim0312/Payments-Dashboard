import { beforeAll, describe, expect, it } from "vitest";
import resetDb from "./reset-db";
import request from "supertest";
import { app } from "../..";
import prisma from "@repo/db/client";

describe("Testing HDFC Bank webhook",()=>{
    beforeAll(resetDb)
    beforeAll(async ()=>{
        await prisma.user.create({
            data: {
                number:"0000000000",
                password:"000000"
            }
        })
    })
    it("should confirm the onRamping payment",async ()=>{
        const {status, body} = await request(app).post('/hdfcWebhook').send({
            token:"123",
            user_identifier:1,
            amount:100
        })

        expect(status).toBe(200);
        expect(body.message).toBe("Captured");
    })
});