module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define(
      'staff',
      {
        staffId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING,
        },
        joinedDate: {
          type: DataTypes.DATE,
        },
        depId: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        position: {
          type: DataTypes.STRING,
        },
        age: {
          type: DataTypes.INTEGER,
        },
        gender: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.STRING,
        },
        createdBy: {
          type: DataTypes.BIGINT,
        },
        updatedBy: {
          type: DataTypes.BIGINT,
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
        tableName: 'staff',
        timestamps: false,
      }
    );
  
    return Staff;
  };
  