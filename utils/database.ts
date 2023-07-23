import mongoose from "mongoose"

let isConnected = false

const MONGODB_URI = process.env.MONGODB_URI || ''

export const connectToDB = async () => {

    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log('MongoDB is already connected.')
        return
    } 

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "share_prompt",
        })
        isConnected = true
        console.log('MongoDB connected.')
    } catch (error) {
        console.log("There was a problem in connecting to MONGODB", error)
    }

}