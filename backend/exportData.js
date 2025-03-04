const fs = require("fs");
const path = require("path");
const { Sequelize, QueryTypes } = require("sequelize");

// Load database configuration from config.json
const config = require("./config/config.json")["development"];

// Initialize Sequelize with the config
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port || 3306, // Use default MySQL port if not specified
  dialect: config.dialect,
  logging: console.log, // Enable logging for debugging (optional)
});

// Function to format datetime values correctly
const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().slice(0, 19).replace("T", " ");
  };
  
  async function exportData() {
    try {
      const tables = await sequelize.query("SHOW TABLES", { type: QueryTypes.SELECT });
      const tableNames = tables.map((table) => Object.values(table)[0]);
  
      const seedersFolder = path.join(__dirname, "seeders");

      if (!fs.existsSync(seedersFolder)) fs.mkdirSync(seedersFolder);
  
      for (const tableName of tableNames) {
        console.log(`📤 Exporting table: ${tableName}...`);
  
        let data = await sequelize.query(`SELECT * FROM \`${tableName}\``, { type: QueryTypes.SELECT });
  
        // Convert `createdAt` and `updatedAt` to MySQL datetime format
        data = data.map((item) => ({
          ...item,
          createdAt: formatDate(item.createdAt),
          updatedAt: formatDate(item.updatedAt),
        }));
  
        fs.writeFileSync(
          path.join(seedersFolder, `${tableName}.json`),
          JSON.stringify(data, null, 2)
        );
  
        console.log(`✅ ${tableName}.json has been created!`);
      }
  
      console.log("🎉 All tables exported successfully!");
    } catch (error) {
      console.error("❌ Error exporting data:", error);
    } finally {
      await sequelize.close();
    }
  }
  
  exportData();
