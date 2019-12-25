module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('size', {
    small:  {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    medium: {
      type: DataTypes.INTEGER(20), 
      allowNull: true
    },
    large: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    XLarge: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    XXLarge: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    }
  }, {
      timestamps: true
    });
};