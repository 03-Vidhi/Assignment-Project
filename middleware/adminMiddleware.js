// middlewares/adminMiddleware.js
const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = isAdmin;
