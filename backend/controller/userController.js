const User = require('../model/user');
const Role = require('../model/role');
const db = require('../model')
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
    try {
        const loggedUser = req.user;
        const { name, email, password, staffId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({ name, email, password: hashedPassword, staffId, createdBy: loggedUser.userId, createdAt: new Date() });
        return res.status(201).json({ message: "User created successful.", data: user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getUserInfo = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await db.User.findOne({
            where: { userId },
            include: [db.Role, db.Staff],
        });

        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: "Success.", data: user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};



const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        return res.status(200).json({ message: "Success", data: users });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

const getAllStaffInfo = async (req, res) => {
    try {
        const user = req.user;
        console.log(user.roles)
        if (user.roles.includes('Super Admin')) {
            // Super Admin: Access to all staff info
            const staff = await db.User.findAll({ include: [db.Role, db.Staff] });
            return res.status(200).json(staff);
        } else if (user.roles.includes('Manager')) {
            // Manager: Access to staff info in the same department
            const staff = await db.User.findAll({
                where: { departmentId: user.departmentId },
                include: [db.Role, db.Staff],
            });
            return res.status(200).json(staff);
        } else {
            // Standard User: Access only their own info
            return res.status(403).json({ message: 'Forbidden' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, staffId } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ name, email, staffId });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

const assignRolesToUser = async (req, res) => {
    try {
        const { userId, roleIds } = req.body;

        // Find user by ID
        const user = await db.User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add multiple roles to user
        await user.addRoles(roleIds);

        return res.status(200).json({ message: `Roles assigned to user ${user.name} successfully.` });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = { createUser, getAllStaffInfo, getAllUsers, getUserInfo, deleteUser, updateUser, assignRolesToUser }