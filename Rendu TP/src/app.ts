import express from 'express'
import dotenv from 'dotenv'
import {db} from "../config/db.config"

const app = express()

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Db connection then server connection
db.then(() => {
    app.listen(process.env.PORT, () => console.log('Server is listening on port : ' + process.env.PORT))
})
