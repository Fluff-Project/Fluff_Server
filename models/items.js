module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('items', {
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
    category: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    kinds: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    textile: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    style: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    likes: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
      timestamps: true,
      // paranoid:true
    });
};