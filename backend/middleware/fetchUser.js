const jwt = require("jsonwebtoken");
const JWT_SECRET = "study"; // Use the same key from `auth.js`

const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Extract user ID from token
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = fetchUser;
