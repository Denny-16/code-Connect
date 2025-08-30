const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  tags: [
    {
      type: String,
      enum: ["array", "linkedList", "graph", "dp"],
    },
  ],
  visibleTestCases: {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true, // ✅ fixed typo
    },
  },
  hiddenTestCases: {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
  },
  startCode: {
    language: {
      type: String,
      required: true,
    },
    initialCode: {
      type: String,
      required: true,
    },
  },
  referenceSolution: {
    language: {
      type: String,
      required: true,
    },
    referenceCode: {
      type: String,
      required: true,
    },
  },
  problemCreator: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  solvedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Problem = mongoose.model("problem", problemSchema);
module.exports = Problem;
