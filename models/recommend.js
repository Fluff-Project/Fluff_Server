/**
  실제 mysql 과 매핑될 객체 정의 하기 
  mysql 에 정의한 테이블을 시퀄라이즈에 정의해야함.
  id 컬럼은 따로 작성 안해도 됨..
  */
//model을 정의하는 method 는 define() 이고 -> define으로 테이블 생성
//sequelize.define('객체이름', 스키마정의, 테이블설정)



//user table 
module.exports = (sequelize, DataTypes)  => {  
  const recommend = sequelize.define('recommend', {
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
  },  {
      timestamps: true,  // 언제 생성되었는지 시간 추적도 가능하고 db에 따로 create 뭔가가 생긴다.
      paranoid: true
    });

    return recommend;
};
