
import express from 'express'
import cors from 'cors'
import {connection} from "./config/connectDB/connection.js"
import morgan from 'morgan'
const app = express();
app.use(morgan('combined'))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static(".")) 
connection();
const port = 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
  
  