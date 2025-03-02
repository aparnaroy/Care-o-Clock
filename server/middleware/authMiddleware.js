import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify JWT
    req.user = decoded; // Attach user info to request
    next(); // Continue execution
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
