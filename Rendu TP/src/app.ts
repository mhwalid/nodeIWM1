import express from 'express'
import dotenv from 'dotenv'
import {db} from "../config/db.config"

const authRouter = require('./routes/auth.routes')
const humanRouter = require('./routes/human.routes')

const app = express()

dotenv.config();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use("/api/auth", authRouter )
app.use('/api/human', humanRouter)
app.use('/api/animal', humanRouter)

//db connection then server connection
db.then(() => {
    app.listen(process.env.PORT, () => console.log('Server is listening on port 3000'))
})