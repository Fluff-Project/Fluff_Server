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
db.Item = require('./item')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Color = require('./color')(sequelize, Sequelize);
db.Size = require('./size')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

// Sales 폴더
db.Auction = require('./auction')(sequelize, Sequelize);

// Supports 폴더
db.SupportCase = require('./supportCase')(sequelize, Sequelize);

// Users 폴더
db.Keyword = require('./keyword')(sequelize, Sequelize);
db.Seller = require('./seller')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

/*
 * DB 관계 설정
*/

// user-> item


module.exports = db;