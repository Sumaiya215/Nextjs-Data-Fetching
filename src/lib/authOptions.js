import dbConnect, { collectionNames } from "@/lib/dbConnect"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" },
                // email: { label: "Email", type: "email" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                const { username, password } = credentials

                // const res = await fetch("/your/endpoint", {
                //   method: 'POST',
                //   body: JSON.stringify(credentials),
                //   headers: { "Content-Type": "application/json" }
                // })
                // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                const user = await dbConnect(collectionNames.TEST_USER).findOne({ username })
                const isPasswordOk = password == user.password
                // If no error and we have user data, return it
                if (isPasswordOk) {
                    return user
                }
                // Return null if user data could not be retrieved
                else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // authorization: {
            //     params: {
            //       prompt: "consent",
            //       access_type: "offline",
            //       response_type: "code"
            //     }
            //   }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account) {
                try {
                    // console.log("FROM SIGNIN CALLBACK", { user, account, profile, email, credentials })
                    const { providerAccountId, provider } = account;
                    const { email: user_email, image, name } = user;
                    const payload = { providerAccountId, provider, user_email, image, name , role: "user"}
                    console.log("FROM SIGNIN CALLBACK", payload)

                    const userCollection = dbConnect(collectionNames.TEST_USER)
                    const isUserExist = await userCollection.findOne({providerAccountId})
                    if(!isUserExist){
                        await userCollection.insertOne(payload)
                    }
                } catch (error) {
                    console.log(error)
                    return false;
                }

            }

            return true
        },
        async session({ session, token, user }) {

            if (token) {
                session.user.username = token.username
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {

            if (user) {
                token.username = user.username
                token.role = user.role
            }
            return token
        }
    }
}