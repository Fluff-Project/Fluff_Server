module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('item', {
    name: {
      type: DataTypes.STRING(20),  
      allowNull: false,
      unique: true
    },
    image:  {
      type: DataTypes.STRING(400),
      allowNull: false,
    }, 
    price: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    style: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    // brand: {
    //   type: DataTypes.STRING(20),
    //   allowNull: false,
    // },
    condition: {
      type: DataTypes.INTEGER(20),
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
    },
  }, {
      timestamps: true
  });

};