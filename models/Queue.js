import mongoose from "mongoose";

const queueDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  position: Number,
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  isSwappable: {
    type: Boolean,
    default: true,
  },
});

const Queue = mongoose.model("QueueData", queueDataSchema);

export default Queue;
