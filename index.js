import express from "express";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/users.js";
import organizationRouter from "./routes/organizations.js";
import queueRouter from "./routes/queues.js";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use("/users", userRouter);
app.use("/organizations", organizationRouter);
app.use("/queues", queueRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
