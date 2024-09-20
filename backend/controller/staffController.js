const Staff = require('../model/staff');
const Department = require('../model/department');
const db = require('../model');

const createStaff = async (req, res) => {
    try {
        const user = req.user;
        const { code, name, email, mobile, joinedDate, depId, position, age, gender, status } = req.body;
        if (!code || !name || !email || !mobile || !depId || !position || !age || !gender || !status) {
            return res.status(400).json({ message: 'Provide require credentials of a staff.' });
        }
        const staff = await db.Staff.create({ code, name, email, mobile, joinedDate, depId, position, age, gender, status, createdBy: user.userId, createdAt: new Date() });

        return res.status(201).json({ message: 'Successfully created', data: staff });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getStaffDetail = async (req, res) => {
    try {
        const loggedUser = req.user;
        
        const { id } = req.params;
        console.log(loggedUser.roles)
        const userInfo = await db.User.findOne({
            where: {
                userId: loggedUser.userId
            },
            include: [db.Role, db.Staff]
        });
        const staff = await db.User.findOne({
            where: {
                staffId: id
            },
            include: [db.Role, db.Staff]
        });

        console.log(userInfo, staff)
        if (loggedUser.roles.includes('SuperAdmin') ) {
            
            return res.status(200).json({message: "success", data: staff});
        } else if(loggedUser.roles.includes('Manager') && userInfo.staff.depId === staff.staff.depId){
                return res.status(200).json({message: "success", data: staff});
        }
        return res.status(403).json({ message: "Forbidden." });
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = { createStaff, getStaffDetail }