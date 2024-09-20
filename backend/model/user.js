module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'users',
      {
        userId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        staffId: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flag: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        createdBy: {
          type: DataTypes.BIGINT,
        },
        updatedBy: {
          type: DataTypes.BIGINT,
          allowNull: true,
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
        tableName: 'users',
        timestamps: false,
      }
    );
  
    return User;
  };
  