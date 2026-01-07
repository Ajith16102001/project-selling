import jwt from "jsonwebtoken";

const ADMIN_EMAIL = "admin@aktech.com";
const ADMIN_PASSWORD = "admin123";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin", email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};
