import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cardsRouter } from "./routers/cardsRouter"

dotenv.config();

const server = express();
server.use(json());
server.use(cors());
server.use(cardsRouter);

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => { console.log(`Server running succefully on PORT: ${PORT}.`) })