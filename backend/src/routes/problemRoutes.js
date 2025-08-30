const express = require("express");
const { authMiddleware, adminOnly } = require("../middlewares/authMiddleware");
const {
  problemCreate,
  problemUpdate,
  problemDelete,
  problemFetch,
  getAllProblems,
  solvedProblem,
} = require("../controllers/problemController");

const problemRouter = express.Router();

// Public routes
problemRouter.get("/", getAllProblems);

// ✅ User route first to avoid conflict with /:id
problemRouter.get("/user/solved", authMiddleware, solvedProblem);

// Public route for single problem
problemRouter.get("/:id", problemFetch);

// Protected routes
problemRouter.use(authMiddleware);

// ✅ Admin-only routes
problemRouter.post("/create", adminOnly, problemCreate);
problemRouter.patch("/:id", adminOnly, problemUpdate);
problemRouter.delete("/:id", adminOnly, problemDelete);

module.exports = problemRouter;
