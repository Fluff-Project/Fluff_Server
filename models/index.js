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

//추가

db.Recommend = require('./recommend')(sequelize, Sequelize);
db.User = require('./users')(sequelize, Sequelize);
db.Item = require('./items')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);

//model간 관계 정의 
//1. user와 상품(item)관계  1:N
db.User.hasMany(db.Item, {
  foreignKey: 'seller', 
  sourceKey:  'id'
});
db.Item.belongsTo(db.User, {
  foreignKey: 'seller', 
  sourceKey:  'id'
});

db.Order.belongsTo(db.User, {foreignKey: 'customer', sourceKey:  'id'});
//2. Item과 해쉬태그의 관계  N:M
db.Item.belongsToMany(db.Hashtag, { through:  'ItemHashtag' });
db.Hashtag.belongsToMany(db.Item, { through: 'ItemHashtag' });
//3. follow 관계
db.User.belongsToMany(db.User,  {
  foreignKey: 'followingId',
  as: 'Followers',
  through:  'Follow',
});
db.User.belongsToMany(db.User,  {
  foreignKey: 'followingId',
  as: 'Followings',
  through:  'Follow'
});
//4. user와 recommend의 관계 1:1
db.User.hasOne(db.Recommend);
db.Recommend.belongsTo(db.User);
//5. user와 order의 관계  1:N
db.User.hasMany(db.Order, {
  foreignKey: 'customer', 
  sourceKey:  'id'
});
db.Order.belongsTo(db.User);


module.exports = db;