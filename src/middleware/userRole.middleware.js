import jwt from 'jsonwebtoken';

const verifyUserRole = (allowedRoles = []) => (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;

    if (allowedRoles && allowedRoles.includes(decoded.role)) {
      next();
    } else {
      return res.status(403).json({
        message: "Forbidden: User does not have enough access"
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Authentication Failed"
    });
  }
};

export default verifyUserRole;