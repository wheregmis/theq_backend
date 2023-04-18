import express from "express";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/users.js";
import organizationRouter from "./routes/organizations.js";
import queueRouter from "./routes/queues.js";
import messageRouter from "./routes/messages.js";
import ratingRouter from "./routes/ratings.js";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use("/users", userRouter);
app.use("/organizations", organizationRouter);
app.use("/queues", queueRouter);
app.use("/messages", messageRouter);
app.use("/ratings", ratingRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
