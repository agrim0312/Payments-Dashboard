"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export default function AppbarClient(): JSX.Element {

  const customSignout = async () => {
    await signOut;
    router.push("/api/auth/signin");
  }

  const router = useRouter();
  const session = useSession();
  return (
   <div>
      <Appbar onSignin={signIn} onSignout={customSignout} user={session.data?.user} />
   </div>
  );
}
