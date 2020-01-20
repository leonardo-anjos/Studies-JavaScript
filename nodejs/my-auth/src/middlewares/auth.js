require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // get the token from the header if present
  // const token = req.headers['x-access-token'] || req.headers['authorization'];
  const token = req.headers['authorization'];
  // if no token found, return response (without going to the next middelware)
  if (!token) return res.json({ message: 'Access denied. No token provided.', status: 401 });

  try {
    // if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    // if invalid token
    return res.json({ message: 'Invalid token', status: 400 });
  }
};