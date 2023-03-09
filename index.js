import express from 'express';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
const app = express();
app.set('view engine', 'ejs');


app.use(express.json());
dotenv.config()
const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.status(200).json('Hello World!')
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))