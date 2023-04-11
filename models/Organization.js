import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  lattitude: String,
  longitude: String,
  totalCountersToServe: Number,
  currentCountersServing: Number,
});

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
