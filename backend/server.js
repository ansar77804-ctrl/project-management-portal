require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Project Management Portal API" });
});

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

// Connect to DB on module load. In serverless environments this will run
// when the function is initialized. Avoid exiting the process here so the
// serverless runtime can handle errors gracefully.
connectDB()
  .then(() => {
    if (require.main === module) {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } else {
      console.log("Database connected (module mode)");
    }
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    if (require.main === module) {
      process.exit(1);
    }
  });

module.exports = app;
