const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Routes
router.route("/").post(protect, createProduct).get(getProducts);

router.route("/search").get(searchProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
