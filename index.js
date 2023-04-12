import express from "express";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/users.js";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
