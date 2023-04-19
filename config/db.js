import mongoose from "mongoose";

export function connectDB() {
  mongoose
    .connect(
      "mongodb+srv://admin:admin@projectmgntexpress.ctekvne.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => alert("Error connecting to MongoDB", err)
    , console.log(err));
}

export function getAllProjects() {
  // get all the projects from the database
}
