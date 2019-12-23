module.exports = (sequelize, DataTypes)  => { 
  const users =sequelize.define('users', {
    userId: {
      type: DataTypes.STRING(20),  
      allowNull: false,
      unique: true
    }, 
    pwd: {
      type: DataTypes.STRING(20),  
      allowNull: false,
    },    
    email: {
      type: DataTypes.STRING(45),  
      allowNull: false
    },   
    gender: {
      type: DataTypes.CHAR(1),  
      allowNull: false
    },    
    seller: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },    
    address: {
      type: DataTypes.STRING(200),  
      allowNull: true
    },    
    phone: {
      type: DataTypes.STRING(20),  
      allowNull: true
    },
  },  {
      timestamps: true
    });

    return users;
};

