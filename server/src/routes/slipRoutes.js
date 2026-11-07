import express from "express";
import Slip from "../models/Slip.js";

const router = express.Router();

// Get all daily collection entries
router.get("/", async (req, res, next) => {
  try {
    const slips = await Slip.find().sort({ date: -1, from: 1 });
    res.json(slips);
  } catch (error) {
    next(error);
  }
});

// ADD a new entry
router.post("/", async (req, res, next) => {
  try {
    const slip = await Slip.create(req.body);
    res.status(201).json(slip);
  } catch (error) {
    next(error);
  }
});

// UPDATE one entry using its MongoDB ID
router.put("/:id", async (req, res, next) => {
  try {
    const slip = await Slip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!slip) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json(slip);
  } catch (error) {
    next(error);
  }
});

// DELETE one entry using its MongoDB ID
router.delete("/:id", async (req, res, next) => {
  try {
    const slip = await Slip.findByIdAndDelete(req.params.id);

    if (!slip) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;