import NextAuth, { NextAuthConfig, Profile } from "next-auth";
import type { OAuth2Config } from "next-auth/providers";

const scopes = ["identify", "guilds"];

export const authConfig = {
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
      version: '2.0', // OAuth version
      params: { response_type: 'code', client_id: 'auth-test' },
      authorization: 'http://localhost:3001/api/authorize', // Token URL
      token: 'http://localhost:3001/api/token', // Token URL
      userinfo: 'http://localhost:3001/api/token', // Token URL
      // authorizationUrl: 'http://localhost:3001/api/authorize?response_type=code',
      profile: (profile) => {
        // Function to extract user data from the profile response
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email
        }
      },
      clientId: 'auth-test',
      clientSecret: 'auth-test'
      // Add any custom configuration here
    },
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token: jwtToken }) {
      //@ts-expect-error
      console.log({session, token})
      //@ts-expect-error
      return { ...session, token };
    },
    async jwt({ token, account }) {
      console.log({token, account})
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
} satisfies NextAuthConfig

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(authConfig);
