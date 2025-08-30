const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECT_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = main;
