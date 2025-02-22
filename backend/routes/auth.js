const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure User model exists
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "study"; // Replace with a secure secret key

// Route to create a user
router.post("/createuser", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);          // addin salt for moree security.
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        console.error("Login error:", error.message); // Show detailed error
        res.status(500).json({ error: "Internal server error" });
    }
    
});


// Route: POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      // Compare password with stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const payload = { user: { id: user.id } };
      const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.json({ success: true, authToken });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
