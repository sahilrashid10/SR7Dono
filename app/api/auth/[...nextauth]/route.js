import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose';
import connectDb from '@/db/connectDb';
import User from '@/app/models/User';

// Environment validation to catch swapped/missing env vars on Vercel
const GITHUB_ID = process.env.GITHUB_ID || '';
const GITHUB_SECRET = process.env.GITHUB_SECRET || '';
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_URL || '';
const looksLikeHexSecret = (s) => typeof s === 'string' && /^[0-9a-f]{32,}$/i.test(s);
const envOk = Boolean(GITHUB_ID && GITHUB_SECRET && NEXTAUTH_URL) && !looksLikeHexSecret(GITHUB_ID);

if (!envOk) {
  console.error('NextAuth environment misconfiguration detected.');
  console.error('GITHUB_ID length:', GITHUB_ID.length, 'GITHUB_SECRET length:', GITHUB_SECRET.length, 'NEXTAUTH_URL set:', !!NEXTAUTH_URL);
  console.error('Likely cause: GITHUB_ID and GITHUB_SECRET are swapped in Vercel or missing. Set GITHUB_ID to Client ID and GITHUB_SECRET to Client Secret.');
}
const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || process.env.GITHUB_SECRET || 'dev-secret',
  debug: process.env.NODE_ENV !== 'production',
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
};

// Create NextAuth handler only if env looks correct
let nextAuthHandler = null;
try {
  if (envOk) {
    nextAuthHandler = NextAuth(authOptions);
  }
} catch (e) {
  console.error('Failed to initialize NextAuth handler:', e);
}

export const GET = async (req) => {
  if (!envOk) {
    return new NextResponse(JSON.stringify({ success: false, message: 'Auth environment misconfigured on server. Check GITHUB_ID/GITHUB_SECRET/NEXTAUTH_URL.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
  if (!nextAuthHandler) {
    return new NextResponse(JSON.stringify({ success: false, message: 'Auth handler not initialized. Check server logs.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
  return await nextAuthHandler(req);
};

export const POST = async (req) => {
  if (!envOk) {
    return new NextResponse(JSON.stringify({ success: false, message: 'Auth environment misconfigured on server. Check GITHUB_ID/GITHUB_SECRET/NEXTAUTH_URL.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
  if (!nextAuthHandler) {
    return new NextResponse(JSON.stringify({ success: false, message: 'Auth handler not initialized. Check server logs.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
  return await nextAuthHandler(req);
};
