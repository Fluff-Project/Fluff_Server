// 1대 1 문의
module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('supportCase', {
    title: { 
      type: DataTypes.STRING(20),  
      allowNull: false
    },
    content: { 
      type: DataTypes.STRING(400),  
      allowNull: false
    }
  }, {
      timestamps: true
  });

};