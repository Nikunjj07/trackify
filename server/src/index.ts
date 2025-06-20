import express from "express"
import mainRouter from "./routes";

const app = express();
app.use(express.json())

app.use("/api",mainRouter)

app.listen(3000);