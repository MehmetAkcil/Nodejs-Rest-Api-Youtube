import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'
const app = express()


dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

router(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});