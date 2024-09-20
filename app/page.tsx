import { auth } from "@/auth";
import { SignInButton } from "@/components/sign-in-button";

export default async function Home() {
  let session = await auth();
  console.log({ session });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? <p>signed in!</p> : <SignInButton />}
    </main>
  );
}
