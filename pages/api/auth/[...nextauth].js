import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import NextAuth from "next-auth";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
     FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  })

    // ...add more providers here
  ],
  // pages: {
  //   signIn: "/auth/signin",
  //   // signOut: "/auth/signout",
  //   // error: "/auth/error", // Error code passed in query string as ?error=
  //   // verifyRequest: "/auth/verify-request", // (used for check email message)
  //   // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  debug: true
  
});
