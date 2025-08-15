import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectDb from "@/db/connectDb";
import User from "@/app/models/User";

// Connect to DB globally once
await connectDb();

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = await User.create({
          email: user.email,
          username: user.email.split("@")[0],
        });
      }
      user.name = dbUser.username;
      return true;
    },
    async session({ session }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
