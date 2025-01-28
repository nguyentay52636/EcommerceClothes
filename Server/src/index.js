
import express from 'express'
import cors from 'cors'
import {connection} from "./config/monggoDB/connection.js"
import morgan from 'morgan'
import RootRouter from "./routes/RootRouter.js"
const app = express();
app.use(morgan('combined'))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static(".")) 
app.use(RootRouter)
connection();
const port = 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
  
 