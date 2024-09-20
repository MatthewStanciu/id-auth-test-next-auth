import { auth } from "@/auth";
import { SignInButton } from "@/components/sign-in-button";
import { SignOutButton } from "@/components/sign-out-button";

export default async function Home() {
  const session = await auth();
  const profile = session?.user;
  console.log({ session });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold">You&apos;re authenticated!</h1>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
