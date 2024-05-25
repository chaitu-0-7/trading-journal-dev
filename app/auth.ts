import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/db/authConnect"
import google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"



const providers: Provider[] = [google]



 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: providers,
    // pages: {
    //     signIn: "/signin", // Specify the path to your custom sign-in page here
    //   },
})