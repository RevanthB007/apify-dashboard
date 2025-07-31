import dotenv from "dotenv";
import express from "express";
import apifyRoutes from "./src/routes/route.js";
import cors from "cors"; 
dotenv.config();

const port = process.env.PORT || 3000;
const app = express()
app.use(express.json());
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }
));


app.use("/api",apifyRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})