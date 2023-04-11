import mongoose from "mongoose";

const waitListSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  date: String,
  time: String,
  partySize: Number,
  notes: String,
});

const WaitList = mongoose.model("WaitList", waitListSchema);

export default WaitList;
