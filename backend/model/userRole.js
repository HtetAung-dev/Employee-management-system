module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define(
      'user_role',
      {
        userId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        roleId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        flag: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        tableName: 'user_role',
        timestamps: false,
      }
    );
  
    return UserRole;
  };
  