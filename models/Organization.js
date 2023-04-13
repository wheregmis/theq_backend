import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  address: String,
  website: String,
  lattitude: String,
  longitude: String,
  totalCountersToServe: Number,
  currentCountersServing: Number,
  rating: Number,
  qrCode: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
