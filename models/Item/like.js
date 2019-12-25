module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('like', {
    dibs: {  // like 개수
      type: DataTypes.BOOLEAN,
      allowNull:  true,
    }
  }, {   
    timestamps: true
  });
};