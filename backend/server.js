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

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
