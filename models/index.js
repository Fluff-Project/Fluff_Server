'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Items 폴더
db.Item = require('./Item/item')(sequelize, Sequelize);
db.Category = require('./Item/category')(sequelize, Sequelize);
db.Color = require('./Item/color')(sequelize, Sequelize);
db.Size = require('./Item/size')(sequelize, Sequelize);
db.Hashtag = require('./Item/hashtag')(sequelize, Sequelize);
db.Like = require('./Item/like')(sequelize, Sequelize);

// Sales 폴더
db.Auction = require('./Sale/auction')(sequelize, Sequelize);

// Supports 폴더
db.SupportCase = require('./Support/supportCase')(sequelize, Sequelize);

// Users 폴더
db.Keyword = require('./User/keyword')(sequelize, Sequelize);
db.Seller = require('./User/seller')(sequelize, Sequelize);
db.User = require('./User/user')(sequelize, Sequelize);

/*
 * DB 관계 설정
*/

// user <-> item ( N:M )
db.User.belongsToMany(db.Item, { through: 'order' });
db.Item.belongsToMany(db.User, { through: 'order' });

// item <-> hashtag ( N:M )
db.Item.belongsToMany(db.Hashtag, { through: 'item_hashtag' });
db.Hashtag.belongsToMany(db.Item, { through: 'item_hashtag' });

// SupportCase, Keyword -> User ( 1:1 )
db.User.hasOne(db.Keyword);
db.User.hasOne(db.SupportCase);

// Item -> Color, Size  ( 1:N )
db.Item.hasMany(db.Color);
db.Item.hasMany(db.Size);

// item <-> catagory ( N:M )
db.Item.belongsToMany(db.Category, { through: 'item_category' });
db.Category.belongsToMany(db.Item, { through: 'item_category' });

// user <-> seller ( N:M )
db.User.belongsToMany(db.Seller, { through: 'follow', foreignKey: 'following' });
db.Seller.belongsToMany(db.User, { through: 'follow', foreignKey: 'follower' });

// user -> seller ( 1:1 )
// db.Seller.belongsTo(db.User);
db.User.hasOne(db.Seller);

// item -> seller ( 1: N )
db.Seller.hasMany(db.Item);

// user <-> auction ( N:M )
db.User.belongsToMany(db.Auction, { through: 'bidding,'});
db.Auction.belongsToMany(db.User, { through: 'bidding,'});

// like -> user ( 1:N )
db.User.hasMany(db.Like);

// like -> item ( 1:1 )
// db.Like.belongsTo(db.Item);
db.Item.hasOne(db.Like);

module.exports = db;