module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('category', {
    kind: {
      type: DataTypes.INTEGER(20),
      allowNull:  true,
    },
    depth: {
      type: DataTypes.INTEGER(20),
      allowNull:  true,
    },
    parentId: {
      type: DataTypes.INTEGER(20),
      allowNull:  true,
    }
  }, {   
    timestamps: true
  });
};