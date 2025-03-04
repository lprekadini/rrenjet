const fs = require("fs");
const path = require("path");

module.exports = {
  async up(queryInterface, Sequelize) {
    const seedersFolder = path.join(__dirname, "../seeders");
    const files = fs.readdirSync(seedersFolder);

    for (const file of files) {
      if (file.endsWith(".json")) {
        const tableName = file.replace(".json", ""); // Get filename as table name

        // Adjust table names to match database
        const tableMapping = {
          Category: "Categories",
          Personality: "Personalities",
          User: "Users",
          personality_category: "personality_category", // This one seems correct
        };

        const correctTableName = tableMapping[tableName] || tableName;

        const data = JSON.parse(fs.readFileSync(path.join(seedersFolder, file), "utf8"));

        if (data.length > 0) {
          console.log(`🌱 Seeding table: ${correctTableName}`);
          await queryInterface.bulkInsert(correctTableName, data);
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const seedersFolder = path.join(__dirname, "../seeders");
    const files = fs.readdirSync(seedersFolder);

    for (const file of files) {
      if (file.endsWith(".json")) {
        const tableName = file.replace(".json", "");

        // Adjust table names to match database
        const tableMapping = {
          Category: "Categories",
          Personality: "Personalities",
          User: "Users",
          personality_category: "personality_category",
        };

        const correctTableName = tableMapping[tableName] || tableName;

        console.log(`🚮 Removing data from table: ${correctTableName}`);
        await queryInterface.bulkDelete(correctTableName, null, {});
      }
    }
  }
};
