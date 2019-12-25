module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('hashtag', {
    tagName: {
      type: DataTypes.STRING(20),  
      allowNull: false
    }
  }, {
      timestamps: true
  });

};