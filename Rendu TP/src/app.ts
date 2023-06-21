import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Server connection
app.listen(3000, () => console.log('Server is listening on port 3000'))
