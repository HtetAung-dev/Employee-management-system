const Role = require('../model/role');
const db = require('../model');

const createRole = async (req, res) => {
    try {
      const { name, label, flag } = req.body;
      
      const role = await db.Role.create({ name, label, createdAt : new Date() });
      
      return res.status(201).json({message: 'Successfully created', data: role});
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };

  module.exports = { createRole }