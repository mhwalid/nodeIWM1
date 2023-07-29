//importing modules
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

//details from the env
const username = process.env.LOGIN
const password = process.env.PASSWORD
const dbName = process.env.DB_NAME

//connection string to mongo atlas

const connectionString = `mongodb+srv://${username}:${password}@mongodb-iw-m1.k2fxrp6.mongodb.net/${dbName}?retryWrites=true&w=majority`
console.log(connectionString)

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

//db connection
export const db = mongoose.connect(connectionString, options)
    .then(res => {
        if(res){
            console.log(`Database connection successfully to ${dbName}`)
        }

    }).catch(err => {
        console.log('`Database connection error', err)
    })