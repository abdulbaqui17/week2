import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import express from "express";
import userRouter from "./router/user.js";
import zapRouter from "./router/zap.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/users",userRouter)
app.use("/api/v1/zap",zapRouter)

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});