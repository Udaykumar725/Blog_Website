import express from "express";
import  dotenv  from 'dotenv';
import connectDB from "./database/db.js";
import Router from './routes/route.js';
import cors from 'cors'
import bodyParser from 'body-parser';

const app= express();

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router)

dotenv.config()
connectDB();


const PortNumber= process.env.PORT

app.listen(PortNumber, () => {
    console.log(`Server is running on port ${PortNumber}`)
})