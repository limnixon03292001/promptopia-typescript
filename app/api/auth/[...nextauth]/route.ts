
import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database"
import User from '@models/user'

const clientId: string = process.env.GOOGLE_ID || '';
const clientSecret: string = process.env.GOOGLE_CLIENT_SECRET || '';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: clientId,
            clientSecret: clientSecret
        })
    ],
    callbacks: {
        async session({ session }: any) {

            const sessionUser = await User.findOne({ email: session.user.email })
            
            if(session) {
                session.user.id = sessionUser._id.toString();
            }
           
            return session
        },
        
        async signIn({ profile }: any) {
            try {
                await connectToDB()
    
                const userExists = await User.findOne({ email: profile.email })
                
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
    
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
     }
})

export { handler as GET, handler as POST }