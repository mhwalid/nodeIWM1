import express from 'express'
import dotenv from 'dotenv'

const app = express()

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Server connection
app.listen(process.env.PORT, () => console.log('Server is listening on port 3000'))
