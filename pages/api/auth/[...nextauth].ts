import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

// grab credentials for OAuth provider, using built-in next-auth handling
// .env variables inferred as String type
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.JWT_SECRET
})