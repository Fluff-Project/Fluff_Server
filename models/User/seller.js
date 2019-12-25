module.exports = (sequelize, DataTypes)  => { 
  return sequelize.define('seller', {
    totalSale: {
      type: DataTypes.INTEGER(20),  // 총 매출액
      allowNull: true,
    }
  }, {
    timestamps: true
  });
};
