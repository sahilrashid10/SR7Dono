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
      if (account && account.provider === 'github') {
        try {
          await connectDb();
        } catch (dbErr) {
          console.error('NextAuth signIn: failed to connect to DB', dbErr);
          // allow sign in to fail safely
          return false;
        }

        // Some providers may not populate the `email` param; use user or profile as fallback
        const userEmail = (user && user.email) || (profile && profile.email) || email;
        if (!userEmail) {
          console.error('NextAuth signIn: no email available from provider');
          return false;
        }

        let currentUser = null;
        try {
          currentUser = await User.findOne({ email: userEmail });
        } catch (findErr) {
          console.error('NextAuth signIn: error finding user in DB', findErr);
          return false;
        }

        if (!currentUser) {
          try {
            const newUser = new User({
              email: userEmail,
              username: userEmail.split('@')[0],
            });
            await newUser.save();
            // attach username back to next-auth user object for session callback
            user.name = newUser.username;
          } catch (saveErr) {
            console.error('NextAuth signIn: error creating new user', saveErr);
            return false;
          }
        } else {
          // ensure next-auth user has the username attached
          user.name = currentUser.username;
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
