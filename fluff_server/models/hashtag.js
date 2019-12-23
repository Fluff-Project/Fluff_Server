module.exports = (sequelize, DataTypes)  => {  
  const hashtag = sequelize.define('hashtag', {
    tagName: {
      type: DataTypes.STRING(20),
      allowNull:  false,
      unique: true
    }
  },{
    timestamps: true,
    paranoid: true,
    });

    return hashtag;
};