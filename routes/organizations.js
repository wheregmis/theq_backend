import express, { json } from "express";
import Organization from "../models/Organization.js";
import Queue from "../models/Queue.js";
import User from "../models/User.js";
import axios from "axios";

const organizationRouter = express.Router();

// Route to create a new organization
organizationRouter.post("/", async (req, res) => {
  try {
    console.log("API GOT HIT");
    const openAiResponse = await axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: req.body.organizationDescription,
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            Authorization: "Bearer " + process.env.OPENAI_API_KEY,
          },
        }
      )
      .catch((err) => {
        console.log(err);
      })
      .then(async (openAiRes) => {
        console.log(openAiRes.data);
        let organization = new Organization({
          name: req.body.organizationName,
          description: req.body.organizationDescription,
          address: req.body.organizationAddress,
          image: openAiRes.data.data[0].url,
          website: req.body.organizationWebsite,
          lattitude: req.body.organizationLatitude,
          longitude: req.body.organizationLongitude,
        });

        organization = await organization.save();

        let user = new User({
          name: req.body.organizationName,
          aliasName: req.body.organizationName,
          aboutYou: req.body.organizationDescription,
          email: req.body.email,
          password: req.body.password,
          type: "organization",
          organization: organization._id,
          image: openAiRes.data.data[0].url,
        });

        user = await user.save();

        res.status(200).json({
          status: 200,
          data: user,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to get all organizations
organizationRouter.get("/", async (req, res) => {
  try {
    let organizations = await Organization.find();

    // get all queues for this organization
    const queues = await Queue.find();

    const new_organizations = organizations.map((organization) => {
      const organizationQueues = queues
        .filter(
          (queue) =>
            queue.organization.toString() === organization._id.toString()
        )
        .sort((a, b) => a.joinedAt - b.joinedAt)
        .map((queue) => queue.toObject());

      return {
        ...organization.toObject(),
        queues: organizationQueues,
      };
    });

    res.status(200).json({
      status: 200,
      data: new_organizations,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to get an organization by ID
organizationRouter.get("/:organizationID", async (req, res) => {
  try {
    let organization = await Organization.findById(req.params.organizationID);
    // get all queues for this organization

    const queues = await Queue.find({
      organization: req.params.organizationID,
    }).sort("joinedAt");

    if (organization) {
      res.status(200).json({
        status: 200,
        data: {
          ...organization._doc,
          queues,
        },
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No organization found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to update an organization by ID
organizationRouter.put("/:organizationID", async (req, res) => {
  try {
    let organization = await Organization.findByIdAndUpdate(
      req.params.organizationID,
      req.body,
      {
        new: true,
      }
    );
    if (organization) {
      res.status(200).json({
        status: 200,
        data: organization,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No organization found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to delete an organization by ID
organizationRouter.delete("/:organizationID", async (req, res) => {
  try {
    let organization = await Organization.findByIdAndRemove(
      req.params.organizationID
    );
    if (organization) {
      res.status(200).json({
        status: 200,
        message: "Organization deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No organization found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

export default organizationRouter;
