const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Personality = sequelize.define("Personality", {
  name: { type: DataTypes.STRING, allowNull: false },
  biography: DataTypes.TEXT,
  birth_date: DataTypes.DATE,
  image_url: DataTypes.STRING,
  video_url: DataTypes.STRING,
});

Personality.associate = (models) => {
  Personality.belongsToMany(models.Category, {
    through: "PersonalityCategories",
  });
};

module.exports = Personality;
