const express = require("express");
const productController = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware"); // Middleware for authentication
const { pagination } = require("../middleware/pagination"); // Middleware for pagination
const router = express.Router();

// Destructure the product controller methods
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getUserProducts,
  getCurrentUser,
} = productController;

// Routes

// Create a product (protected) and get all products with pagination
router
  .route("/")
  .post(protect, createProduct) // Create a new product (protected)
  .get(pagination, getProducts); // Get all products with pagination

// Route to get the current logged-in user's information and their products
router.get("/me", protect, getCurrentUser); // Get current logged-in user info

// Fetch the logged-in user's products with pagination
router.get("/user-products", protect, pagination, getUserProducts); // Get user's own products

// Search products with pagination
router.get("/search", pagination, searchProducts); // Search products

// Get, update, or delete a product by ID (with authentication for protected routes)
router
  .route("/:id")
  .get(getProductById) // Get product by ID
  .put(protect, updateProduct) // Update product (protected)
  .delete(protect, deleteProduct); // Delete product (protected)

module.exports = router;
