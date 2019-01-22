const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
const fs = require('fs');

const sequelize= new Sequelize(
  config.database,config.username,config.password,config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

/*
db.User = require('./user')(sequelize,Sequelize);
db.Post = require('./post')(sequelize,Sequelize);
db.User.hasMany(db.Post);
db.Item = require('./item')(sequelize,Sequelize);
*/



  
module.exports = db;
