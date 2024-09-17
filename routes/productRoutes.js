const express = require("express");
const productController = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware"); // Use destructuring to get the protect function

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
  getCurrentUser, // Make sure to import this as well
} = productController;

// Routes
router.route("/").post(protect, createProduct).get(getProducts);

// Route to get the current logged-in user's information and their products
router.get("/me", protect, getCurrentUser); // Use 'protect' middleware, not 'authMiddleware' object

// Add route for fetching the logged-in user's products
router.get("/user-products", protect, getUserProducts);

router.route("/search").get(searchProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
