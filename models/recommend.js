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
<<<<<<< HEAD
      timestamps: true,  // 언제 생성되었는지 시간 추적도 가능하고 db에 따로 create 뭔가가 생긴다.
      // paranoid: true
    });
=======
    timestamps: true,
    // paranoid: true
  });
>>>>>>> 8aff965a25963da1b522b0327637e8663e6f0674
};

