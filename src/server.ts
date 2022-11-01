import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {console.log(`Server running succefully on PORT: ${PORT}.`)})