import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// In-memory user for demo purposes
const users = [
  {
    id: '1',
    email: 'john@doe.com',
    password: 'password', // In a real app, this would be a hashed password
    name: 'John Doe',
    role: 'user',
  },
  {
    id: '2',
    email: 't.t.coop@gmail.com',
    password: 'password',
    name: 'T.T. Coop',
    role: 'admin',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((u) => u.email === credentials.email.toLowerCase());

        // For this demo, we'll check if the user exists and the password matches.
        // In a real app, you would use a library like bcrypt to compare hashed passwords.
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session?.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// The auth function is being imported and used in other files.
// To maintain compatibility with how it was being used, we'll export a function
// that simulates the behavior of the original auth() function.
// In a real NextAuth.js v5 setup, this is handled differently.
import { getServerSession } from "next-auth/next"

export async function auth() {
  return await getServerSession(authOptions)
}
