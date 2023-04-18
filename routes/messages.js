import express from "express";
import Message from "../models/Message.js";
import axios from "axios";
import Rating from "../models/Ratings.js";

const messageRouter = express.Router();

// Route to add a user to an organization's queue
messageRouter.post("/", async (req, res) => {
  try {
    const newQueueEntry = new Message({
      userId: req.body.userId,
      organizationId: req.body.organizationId,
      message: req.body.message,
      createdAt: new Date(),
    });

    await newQueueEntry.save();

    var messageForAPI =
      "Extract the rating by doing sentiment analysis of the following message. The Message is " +
      req.body.message +
      ". Give the rating out of 5. Output format is Rating: 1/5 If cannot extract rating its Rating: No Rating";

    const openAiResponse = await axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: messageForAPI,
            },
          ],
        },
        {
          headers: {
            Authorization:
              "Bearer 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",
          },
        }
      )
      .catch((err) => {
        console.log(err);
      })
      .then(async (res) => {
        const newRating = new Rating({
          userId: req.body.userId,
          organizationId: req.body.organizationId,
          rating: res.data.choices[0].message.content,
          createdAt: new Date(),
        });

        await newRating.save();
      });

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
messageRouter.get("/:organizationId", async (req, res) => {
  try {
    const queues = await Message.find({
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

export default messageRouter;
