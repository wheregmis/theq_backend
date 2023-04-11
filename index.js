import express from "express";

import { connectDB } from "./config/db.js";
import projectRouter from "./routes/projects.js";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/tasks.js";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use("/projects", projectRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
