// middleware/pagination.js
exports.pagination = (req, res, next) => {
  // Check if page and limit query parameters are provided, otherwise use defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate how many items to skip (for pagination)
  req.pagination = {
    page,
    limit,
    skip: (page - 1) * limit,
  };

  next();
};
