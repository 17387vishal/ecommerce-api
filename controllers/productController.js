const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    // Debugging statement
    console.log("User:", req.user);

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      user: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "username email");
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "Not authorized to update this product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "Not authorized to delete this product" });
    }

    // Use the correct method to delete
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
