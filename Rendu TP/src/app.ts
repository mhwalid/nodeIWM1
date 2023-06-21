import express from 'express'
import dotenv from 'dotenv'
import {router} from "./routes/human.routes"
import {db} from "../../nodeIWM1/Rendu TP/config/db.config"

const app = express()

dotenv.config();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use('/api/human', router)

//db connection then server connection
db.then(() => {
    app.listen(process.env.PORT, () => console.log('Server is listening on port 3000'))
})