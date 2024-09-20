/*
 * Authorization - middleware
 * authorize(true, ...<role_id>) === true
 * true means that his role must be one of these.
 * false means that his role must not be one of these.
 */
const db = require('../model');

const authorize = (permission, ...roles) => {
  return async function (req, res, next) {

    const id = req.userId;

    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(401).json({ success: false, error: "User is not registered yet!" });
    }
    const result = roles.includes(user.roles);
    if ((!permission && result) || (permission && !result)) {
      return res.status(403).json({ success: false, error: "This action can not be performed!" });
    }
    next();
  };
};

module.exports = authorize;
