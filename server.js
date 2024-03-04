import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import cookieParser from 'cookie-parser'
import connection from "./db/connectionMongo.js";
const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);


app.listen(port, () => {
    connection();
    console.log(`Server started running at ${port} port.`)
});
//done