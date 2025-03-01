const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Personality = sequelize.define('Personality', {
    name: { type: DataTypes.STRING, allowNull: false },
    biography: DataTypes.TEXT,
    birth_date: DataTypes.DATE,
    image_url: DataTypes.STRING,
    video_url: DataTypes.STRING
});

module.exports = Personality;