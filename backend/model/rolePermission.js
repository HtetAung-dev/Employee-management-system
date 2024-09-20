module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define(
      'role_permission',
      {
        roleId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        permissionId: {
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
        tableName: 'role_permission',
        timestamps: false,
      }
    );
  
    return RolePermission;
  };
  