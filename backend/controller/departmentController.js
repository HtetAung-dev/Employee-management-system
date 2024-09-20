const User = require('../model/user');
const Role = require('../model/role');
const Department = require('../model/department');
const db = require('../model');


const createDepartment = async (req, res) => {
    try {
      const { name, label, flag } = req.body;
      const dept = await db.Department.create({ name, label, flag, createdAt: new Date()});
      return res.status(201).json(dept);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
  };

const getDeptInfo = async (req, res) => {
  try {
    const {depId} = req.params;
    
    const dept = await db.Department.findByPk(depId);

    if (!dept) return res.status(404).json({ message: 'Department not found' });
    return res.status(200).json({message: "Success", data: dept});
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const getAllDepts = async (req, res) => {
    try {
      const depts = await db.Department.findAll();
      return res.status(200).json({message: "Success", data: depts});
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };

const updateDept = async (req, res) => {
    try {
      const { name, label, flag } = req.body;
      const {depId} = req.params;
      const dept = await db.Department.findByPk(depId);
      if (!dept) return res.status(404).json({ message: 'Department not found' });
  
      await dept.update({ name, email, staffId });
      return res.status(200).json({messge: "Successfully updated.", data: dept});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
  };

  const deleteDept = async (req, res) => {
    try {
      const { depId } = req.params;
      const dept = await db.Department.findByPk(depId);
      if (!dept) return res.status(404).json({ message: 'Department not found' });
  
      await dept.destroy();
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
  };

module.exports = {createDepartment, getAllDepts, getDeptInfo, deleteDept, updateDept}