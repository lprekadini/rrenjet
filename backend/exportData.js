const fs = require("fs");
const path = require("path");
const { sequelize } = require("./models");
const models = require("./models");

const seedersFolder = path.join(__dirname, "seeders");

if (!fs.existsSync(seedersFolder)) {
  fs.mkdirSync(seedersFolder);
}

const tableMappings = {
  Category: "Categories",
  Personality: "Personalities",
  User: "Users",
  personality_category: "personality_category",
};

async function exportData() {
  try {
    for (const modelName of Object.keys(models)) {
      const model = models[modelName];
      if (!model.findAll) continue;

      const tableName = tableMappings[modelName] || modelName;
      let data = await model.findAll({ raw: true });

      if (data.length > 0) {
        // ✅ Ensure required fields exist & format dates
        data = data.map((item) => ({
          id: item.id || null, // Ensure primary key exists
          name: item.name || "", // Ensure string fields exist
          createdAt: item.createdAt
            ? new Date(item.createdAt).toISOString().slice(0, 19).replace("T", " ")
            : new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: item.updatedAt
            ? new Date(item.updatedAt).toISOString().slice(0, 19).replace("T", " ")
            : new Date().toISOString().slice(0, 19).replace("T", " "),
        }));

        const filePath = path.join(seedersFolder, `${tableName}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`✅ Exported: ${tableName} (${data.length} records)`);
      } else {
        console.log(`⚠️ No data found for: ${tableName}, skipping.`);
      }
    }

    console.log("🎉 Data export completed successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error exporting data:", error);
    process.exit(1);
  }
}

exportData();
