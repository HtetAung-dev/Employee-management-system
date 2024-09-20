require("dotenv").config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Role = require('../model/role');
const db = require('../model');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await db.User.findOne({ where: { email }, include: [db.Role] });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const roles = user.roles.map(role => role.name);
    // Create JWT token
    const token = jwt.sign({ userId: user.userId, roles: roles }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const register = async(req,res) => {
    try {
        const { name, email, password, staffId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({ name, email, password: hashedPassword, createdBy: 1, createdAt: new Date() });
        res.status(201).json({message: "User created successful.", data: user});
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
}

module.exports = {login, register}
