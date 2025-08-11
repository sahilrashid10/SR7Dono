import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose';
import connectDb from '@/db/connectDb';
import User from '@/app/models/User';
const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == 'github') {
        await connectDb();
        const currentUser = await User.findOne({ email: email })
        if (!currentUser) {
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
          })
          await newUser.save();
          user.name = newUser.username
        }
      }
      // if not returning this true, you get an error that you dont have the permission to sign in
      return true;
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email})
      session.user.name = dbUser.username
    return session
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
