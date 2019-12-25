module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('color', {
    beige: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    black:  {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    }, 
    brown: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    white: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    grey: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    green: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    blue: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    pink: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    indigo: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    yellow: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },    
    red: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    orange: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    purple: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    dotPattern: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
    checkPattern: {
      type: DataTypes.BOOLEAN, 
      allowNull: true,
    },
  }, {
      timestamps: true
    });
  };