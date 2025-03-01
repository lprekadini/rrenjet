const sequelize = require('../db');
const Personality = require('./Personality');
const Category = require('./Category');

const User = require('./User');

Personality.belongsToMany(Category, { through: 'personality_category' });
Category.belongsToMany(Personality, { through: 'personality_category' });

module.exports = { sequelize, Personality, Category, User };