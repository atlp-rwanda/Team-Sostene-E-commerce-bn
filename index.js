import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

const app = express()

dotenv.config()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).json('Hello World!')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))