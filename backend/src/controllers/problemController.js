const Problem = require("../models/problem");
const problemValidator = require("../utils/problemValidator");

// ---------------- CREATE PROBLEM (Admin only) ----------------
const problemCreate = async (req, res) => {
  try {
    const { error } = problemValidator(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }

    const problem = new Problem({
      ...req.body,
      problemCreator: req.user._id, // ✅ comes from authMiddleware
    });

    await problem.save();

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problem,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- UPDATE PROBLEM (Admin only) ----------------
const problemUpdate = async (req, res) => {
  try {
    const { error } = problemValidator(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }

    const { id } = req.params;
    const updatedProblem = await Problem.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      updatedProblem,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- DELETE PROBLEM (Admin only) ----------------
const problemDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProblem = await Problem.findByIdAndDelete(id);

    if (!deletedProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- FETCH SINGLE PROBLEM ----------------
const problemFetch = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id).populate(
      "problemCreator",
      "firstName lastName emailId role"
    );

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({ success: true, problem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- FETCH ALL PROBLEMS ----------------
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}).populate(
      "problemCreator",
      "firstName lastName emailId role"
    );
    res.status(200).json({ success: true, problems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- FETCH SOLVED PROBLEMS (User) ----------------
const solvedProblem = async (req, res) => {
  try {
    const problems = await Problem.find({ solvedBy: req.user._id });

    res.status(200).json({
      success: true,
      problems,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  problemCreate,
  problemUpdate,
  problemDelete,
  problemFetch,
  getAllProblems,
  solvedProblem,
};
