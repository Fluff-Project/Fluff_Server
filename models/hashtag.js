module.exports = (sequelize, DataTypes)  => {  
  return sequelize.define('hashtag', {
    tagName: {
      type: DataTypes.STRING(20),
      allowNull:  false,
      unique: true
    }
  }, {
    timestamps: true,
    // paranoid: true,
<<<<<<< HEAD
    });
=======
  });
>>>>>>> 8aff965a25963da1b522b0327637e8663e6f0674
};