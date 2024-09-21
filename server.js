const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Default route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the eCommerce API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown for server
const shutdown = () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

// Handle process termination signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Export the app and server
module.exports = { app, server };
