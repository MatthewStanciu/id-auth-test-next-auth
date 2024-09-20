import NextAuth, { NextAuthConfig, Profile } from "next-auth";
import type { OAuth2Config } from "next-auth/providers";

const scopes = ["identify", "guilds"];

export const authConfig = {
  debug: true,
  providers: [
    // {
    //   id: "purduehackers-id",
    //   name: "Purdue Hackers ID",
    //   type: "oauth",
    //   authorization: "http://localhost:3000/api/authorize",
    // }
    {
      id: 'purduehackers-id', // id of the provider
      name: 'Purdue Hackers ID', // Name of the provider
      type: 'oauth',
      authorization: {
        url: 'https://id.purduehackers.com/api/authorize?response_mode=form_post',
        params: {
          scope: 'user:read user'
        }
      },
      checks: [],
      token: {
        url: 'https://id.purduehackers.com/api/token',
        conform: async(response: any) => {
          console.log({ response })
          return response
        }
      },
      issuer: 'https://id.purduehackers.com/api',
      userinfo: {
        url: 'https://id.purduehackers.com/api/user'
      },
      // authorizationUrl: 'https://id.purduehackers.com/api/authorize?response_type=code',
      profile: (profile) => {
        // Function to extract user data from the profile response
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email
        }
      },
      clientId: 'auth-test',
      clientSecret: 'auth-test',
      // Add any custom configuration here
    },
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token: jwtToken }) {
      //@ts-expect-error
      console.log({session, token})
      //@ts-expect-error
      return { ...session, token };
    },
  },
} satisfies NextAuthConfig

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(authConfig);
