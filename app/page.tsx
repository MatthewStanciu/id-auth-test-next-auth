import { auth } from "@/auth";
import { SignInButton } from "@/components/sign-in-button";
import { SignOutButton } from "@/components/sign-out-button";

export default async function Home() {
  let session = await auth();
  console.log({ session });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <div className="flex flex-col justify-center">
          <p>signed in!</p>
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
