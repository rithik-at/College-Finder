import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Demo Account",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        // For demonstration/internship purposes, allow a hardcoded admin login
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return {
            id: "demo-admin-id",
            name: "Admin User",
            email: "admin@collegehub.com",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
          };
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session to easily work across Vercel deployments
  },
  pages: {
    // Optional: add custom sign-in page later if desired
    // signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
