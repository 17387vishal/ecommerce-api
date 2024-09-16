const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
// routes/productRoutes.js
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getUserProducts,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

// Routes
router.route("/").post(protect, createProduct).get(getProducts);

// Add route for fetching the logged-in user's products
router.get("/user-products", protect, getUserProducts);

router.route("/search").get(searchProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
