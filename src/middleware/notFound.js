// src/middleware/notFound.js
const notFound = (req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
};

module.exports = notFound;
