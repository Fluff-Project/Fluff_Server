module.exports = (sequelize, DataTypes)  => {  
  const order = sequelize.define('order', {
    name: {
      type: DataTypes.STRING(20),  //임시값!
      allowNull: false,
    },
    address:  {
      type: DataTypes.STRING(400),
      allowNull: false,
    }, 
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },  {
      timestamps: true,  // 언제 생성되었는지 시간 추적도 가능하고 db에 따로 create 뭔가가 생긴다.
      paranoid: true
    });
    return order;
};