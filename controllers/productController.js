const User = require("../models/User");
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
    const { page, limit, skip } = req.pagination;
    const sortBy = req.query.sort_by;
    const order = req.query.order === "desc" ? -1 : 1;

    const sortOptions = sortBy
      ? sortBy.split(",").reduce((acc, field) => {
          acc[field.trim()] = order;
          return acc;
        }, {})
      : {};

    const products = await Product.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate("user", "username email");

    const totalProducts = await Product.countDocuments();

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        limit,
      },
    });
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
    const product = await Product.findById(req.params.id).populate("user");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("Product user:", product.user ? product.user.username : "");
    console.log("Current user:", req.user ? req.user.username : "");

    /*
    if (product.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "Not authorized to update this product" });
    }
    */

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

    /* if (product.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "Not authorized to delete this product" });
    }
*/
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  //const searchTerm = req.query.searchTerm;
  const { searchTerm, id, price } = req.query;

  if (!searchTerm && !id && !price) {
    return res
      .status(400)
      .json({ error: "Either searchTerm, id, or price is required" });
  }

  try {
    let query = {};

    if (id) {
      // Search by ID
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "Invalid product ID format" });
      }
      query = { _id: id };
    } else if (searchTerm) {
      query = {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }
    if (price) {
      if (isNaN(price)) {
        return res.status(400).json({ error: "Invalid Price" });
      }
      query = { ...query, price: Number(price) };
    }
    const products = await Product.find(query).exec();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch products created by the logged-in user with pagination
exports.getUserProducts = async (req, res) => {
  try {
    const { page, limit, skip } = req.pagination; // Get pagination data from middleware

    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch products created by the logged-in user with pagination
    const products = await Product.find({ user: req.user._id })
      .skip(skip)
      .limit(limit)
      .populate("user", "username email");

    // Get total count for pagination info
    const totalUserProducts = await Product.countDocuments({
      user: req.user._id,
    });

    // Return the paginated products
    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUserProducts / limit),
        totalProducts: totalUserProducts,
        limit,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get the current logged-in user's information
exports.getCurrentUser = async (req, res) => {
  try {
    // Get user from request (this requires user authentication middleware to be applied)
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized, user not logged in" });
    }

    // Fetch user details
    const userDetails = await User.findById(user._id).select("-password"); // Exclude password

    // Optionally, fetch products created by the logged-in user
    const userProducts = await Product.find({ user: user._id });

    res.json({
      user: userDetails,
      products: userProducts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user information" });
  }
};
