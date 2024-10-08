import { signOut } from "@/auth";

export function SignOutButton({ dark }: { dark?: boolean }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className={`mx-auto shadow-blocks-tiny shadow-discord-deselected border-2 border-black ${
        dark ? "" : "bg-discord-light hover:bg-discord-vibrant"
      }`}
    >
      <button
        className={`${
          dark
            ? "bg-discord-vibrant hover:bg-discord-light hover:text-black"
            : "bg-discord-light hover:bg-discord-vibrant"
        } shadow-none border-none rounded-none h-6`}
        type="submit"
      >
        Sign out
      </button>
    </form>
  );
}
