import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();

        try {
          const user = await User.findOne({ email: credentials.email });
          // console.log(user);
          if (user) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordValid) {
              return user;
            } else {
              throw new Error("Wrong credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.role = user.role;
        token.token = user.token;
        token.subjects = user.subjects;
        token.registrationStatus = user.registrationStatus;
      }
      return token;
    },
    session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role;
      session.user.token = token.token;
      session.user.subjects = token.subjects;
      session.user.registrationStatus = token.registrationStatus;
      return session;
    },
  },
  pages: {
    signOut: "/",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as PATCH };
