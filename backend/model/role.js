module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
      'roles',
      {
        roleId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        label: {
          type: DataTypes.STRING,
        },
        flag: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: 'roles',
        timestamps: false,
      }
    );
  
    return Role;
  };
  