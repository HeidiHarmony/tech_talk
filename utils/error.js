const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  
  // Handle specific types of errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation error' });
  }

  // Handle other types of errors
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;