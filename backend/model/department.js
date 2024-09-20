module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define(
      'departments',
      {
        depId: {
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
        tableName: 'departments',
        timestamps: false,
      }
    );
  
    return Department;
  };
  