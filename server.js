import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js'
import connection from "./db/connectionMongo.js";
const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());

app.use('/api/auth', authRoutes);


app.listen(port, () => {
    connection();
    console.log(`Server started running at ${port} port.`)
});
//done