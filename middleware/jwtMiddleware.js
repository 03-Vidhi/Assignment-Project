
const jwt = require('jsonwebtoken');
const config = require('../config');

const jwtMiddleware = (req, res, next) => {
  
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = jwtMiddleware;
