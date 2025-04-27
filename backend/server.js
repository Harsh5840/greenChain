// server.js

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');  // Add this import
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
 // Move this line to the top of the file

// Routes
const nftRoutes = require("./routes/nftRoutes");


// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((error) => console.error("❌ MongoDB connection error:", error));

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/nft", nftRoutes);
app.use("/api/user", userRoutes);  // Add this line
app.use('/api/auth', authRoutes);
app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Use task routes
app.use('/api/tasks', taskRoutes);
