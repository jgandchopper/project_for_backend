const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize= new Sequelize(
    config.database,config.username,config.password,config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize,Sequelize);
//db.Post = require('./post')(sequelize,Sequelize);
db.Item = require('./item')(sequelize,Sequelize);
db.Bid = require('./bid_price')(sequelize,Sequelize);
db.User.hasMany(db.Item);
db.Item.belongsTo(db.User);
//db.Item.userId = db.User.email





module.exports = db;