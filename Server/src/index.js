import express from 'express';
import http from 'http'; 
import cors from 'cors';
import { connection } from "./config/monggoDB/connection.js";
import morgan from 'morgan';
import RootRouter from "./routes/RootRouter.js";
import { setupSocket } from "./socket/SocketServer.js"; 

const app = express();
const server = http.createServer(app); 

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("."));
app.use(RootRouter);

connection();
setupSocket(server); // Khởi tạo socket

const port = 8080;
server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
