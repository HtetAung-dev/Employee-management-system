require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_MYSQL,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
    timezone: process.env.DB_TIMEZONE, // for writing to database
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Department = require("./department")(sequelize, DataTypes);
db.Permission = require("./permission")(sequelize, DataTypes);
db.Role = require("./role")(sequelize, DataTypes);
db.RolePermission = require("./rolePermission")(sequelize, DataTypes);
db.Staff = require("./staff")(sequelize, DataTypes);
db.UserRole = require("./userRole")(sequelize, DataTypes);


// Role-Permission Many-to-Many Relationship
db.Role.belongsToMany(db.Permission, { through: db.RolePermission, foreignKey: 'roleId' });
db.Permission.belongsToMany(db.Role, { through: db.RolePermission, foreignKey: 'permissionId' });

// User-Role Many-to-Many Relationship
db.User.belongsToMany(db.Role, { through: db.UserRole, foreignKey: 'userId' });
db.Role.belongsToMany(db.User, { through: db.UserRole, foreignKey: 'roleId' });

// Staff - Department Relationship (One-to-Many)
db.Department.hasMany(db.Staff, { foreignKey: 'depId' });
db.Staff.belongsTo(db.Department, { foreignKey: 'depId' });

// User - Staff Relationship (One-to-One)
db.Staff.hasOne(db.User, { foreignKey: 'staffId' });
db.User.belongsTo(db.Staff, { foreignKey: 'staffId' });


module.exports = db;
