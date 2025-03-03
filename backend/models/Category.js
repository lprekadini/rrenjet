const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Category = sequelize.define("Category", {
  name: { type: DataTypes.STRING, allowNull: false },
});

Category.associate = (models) => {
  Category.belongsToMany(models.Personality, {
    through: "PersonalityCategories",
  });
};

module.exports = Category;
