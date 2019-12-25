module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('auction', {
    bid: { // 경매 값
      type: DataTypes.INTEGER(20),  
      allowNull: false
    },
    deadline: { // 경매 마감 시간
      type: DataTypes.DATE,  
      allowNull: false
    }
  }, {
      timestamps: true
  });

};