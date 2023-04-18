import express from "express";
import Rating from "../models/Ratings.js";

const ratingRouter = express.Router();

// Route to add a user to an organization's queue
ratingRouter.post("/", async (req, res) => {
  try {
    const newQueueEntry = new Rating({
      userId: req.body.userId,
      organizationId: req.body.organizationId,
      rating: req.body.rating,
      createdAt: new Date(),
    });

    await newQueueEntry.save();

    res.status(200).json({
      status: 200,
      data: newQueueEntry,
      message: "Joined the queue successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to get the queue for an organization
ratingRouter.get("/:organizationId", async (req, res) => {
  try {
    const queues = await Rating.find({
      organizationId: req.params.organizationId,
    }).sort("createdAt");
    res.status(200).json({
      status: 200,
      data: queues,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

export default ratingRouter;
