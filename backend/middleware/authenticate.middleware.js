require("dotenv").config();
const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
    const header = req.get('Authorization');
    const token = header?.split(' ')[1];
    console.log(token)
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;

      // // Check if the user's role is included in the allowed roles
      // if (roles.length && !roles.includes(decoded.roles)) {
      //   return res.status(403).json({ message: 'Forbidden' });
      // }

      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };

module.exports = authenticate
