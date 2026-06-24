const jwt = require("jsonwebtoken");

/**
 * Protects admin-only routes. Reads the JWT from an httpOnly cookie
 * (preferred, set on login) or from the Authorization header as a fallback.
 */
function requireAdminAuth(req, res, next) {
  try {
    const tokenFromCookie = req.cookies?.admin_token;
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
}

module.exports = requireAdminAuth;
