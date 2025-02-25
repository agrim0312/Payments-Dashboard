import GitHubProvider from "next-auth/providers/github";
import db from "@repo/db/client";

export const authOptions = {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID||"",
        clientSecret: process.env.GITHUB_SECRET||""
      })
    ],
    callbacks: {
      async signIn({ user, account }: any) {
        console.log("hi signin")
        if (!user || !user.email) {
          return false;
        }

        try{
          await db.merchant.upsert({
            select: {
              id: true
            },
            where: {
              email: user.email,
            },
            create: {
              email: user.email,
              name: user.name,
              auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
            },
            update: {
              name: user.name,
              auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
            }
          });
          return true;
        }catch(e){
          console.log("Error logging Merchent ",e);
          return false;
        }
      }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
}