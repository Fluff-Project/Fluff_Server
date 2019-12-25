module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('keyword', {
    simple : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    street : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    lovely : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    modernchic : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    unique : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    formal : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    ethnic : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    sporty : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    oldschool : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    hiphop : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    },
    amekaji : {
      type: DataTypes.INTEGER(20),  
      allowNull: true,
    }
  }, {
    timestamps: true,
    // paranoid: true
  });
};