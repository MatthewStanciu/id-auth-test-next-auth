import NextAuth, { NextAuthConfig } from "next-auth";

export const authConfig = {
  debug: true,
  providers: [
    {
      id: 'purduehackers-id',
      name: 'Purdue Hackers ID',
      type: 'oauth',
      authorization: {
        url: 'https://id.purduehackers.com/api/authorize',
        params: {
          scope: 'user:read user',
          response_mode: 'form_post'
        }
      },
      checks: [],
      token: {
        url: 'https://id.purduehackers.com/api/token',
      },
      client: {
        token_endpoint_auth_method: 'client_secret_post',
      },
      issuer: 'https://id.purduehackers.com/api',
      userinfo: {
        url: 'https://id.purduehackers.com/api/user'
      },
      clientId: 'auth-test',
      clientSecret: '',
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
