import express from "express";
import Queue from "../models/Queue";

const queueRouter = express.Router();

// Route to add a user to an organization's queue
queueRouter.post("/", async (req, res) => {
  try {
    // In your routes file (e.g., queueRouter.js), replace the comment with the following code
    const currentQueueCount = await Queue.countDocuments({
      organization: req.body.organization,
    });

    // checking if the user is already in the queue
    const userInQueue = await Queue.findOne({
      user: req.body.user,
      organization: req.body.organization,
    });

    if (userInQueue) {
      res.status(400).json({
        status: 400,
        message: "User already in queue",
      });
      return;
    }

    console.log(currentQueueCount);

    const newQueueEntry = new Queue({
      user: req.body.user,
      organization: req.body.organization,
      position: currentQueueCount + 1,
      status: "Waiting",
      joinedAt: new Date(),
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
queueRouter.get("/organization/:organizationId", async (req, res) => {
  try {
    const queues = await Queue.find({ organization: req.params.organizationId })
      .populate("user")
      .sort("position");
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

// Route to update a user's position in the queue (for swapping)
queueRouter.put("/swap/:queueId1/:queueId2", async (req, res) => {
  try {
    const queue1 = await Queue.findById(req.params.queueId1);
    const queue2 = await Queue.findById(req.params.queueId2);

    if (!queue1 || !queue2 || queue1.organization !== queue2.organization) {
      throw new Error("Invalid swap request");
    }

    // Swap the positions
    const tempPosition = queue1.position;
    queue1.position = queue2.position;
    queue2.position = tempPosition;

    await queue1.save();
    await queue2.save();

    res.status(200).json({
      status: 200,
      message: "Queue positions swapped successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to delete a user's entry from the queue (user has been served or left the queue)
queueRouter.delete(
  "/user/:userId/organization/:organizationId",
  async (req, res) => {
    try {
      const result = await Queue.findOneAndDelete({
        user: req.params.userId,
        organization: req.params.organizationId,
      });

      if (!result) {
        res.status(404).json({
          status: 404,
          message: "User not found in the queue",
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "User removed from the queue",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  }
);

export default queueRouter;
