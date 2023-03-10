import express from 'express'
import dotenv from 'dotenv'

const app = express()

 
dotenv.config()
const PORT = process.env.PORT
 

app.get('/', (req, res) => {
    res.status(200).json('Hello World!')
})

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))