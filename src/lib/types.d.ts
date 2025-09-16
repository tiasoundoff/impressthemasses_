
declare module 'next-auth' {
  interface User {
    role?: string;
  }

  interface Session {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
