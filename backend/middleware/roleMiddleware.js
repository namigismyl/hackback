// middleware/roleMiddleware.js — Restricts access based on user roles

/**
 * Accepts one or more roles and returns middleware that allows
 * only users whose role is in the allowed list.
 * Must be used after authMiddleware (req.user must exist).
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }

    next();
  };
};

module.exports = { authorize };
