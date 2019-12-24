module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('recommend', {
    top1: {
      type: DataTypes.STRING(20),  //임시값!
      allowNull: false,
    },
    top2:  {
      type: DataTypes.STRING(20),
      allowNull: false,
    }, 
    top3: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    timestamps: true,
    // paranoid: true
  });
};

