import express, { json } from "express";
import Organization from "../models/Organization.js";
import Queue from "../models/Queue.js";

const organizationRouter = express.Router();

// Route to create a new organization
organizationRouter.post("/", async (req, res) => {
  try {
    let organization = new Organization(req.body);
    organization = await organization.save();

    res.status(200).json({
      status: 200,
      data: organization,
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
    });

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
