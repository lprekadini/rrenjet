const sequelize = require('./db');
const { exec } = require("child_process");

(async () => {
    try {
        console.log("🚀 Running migrations...");
        await new Promise((resolve, reject) => {
            exec("npx sequelize-cli db:migrate", (error, stdout, stderr) => {
                if (error) {
                    console.error(`❌ Migration error: ${error.message}`);
                    reject(error);
                }
                if (stderr) console.error(`⚠️ Migration stderr: ${stderr}`);
                console.log(`✅ Migration output: ${stdout}`);
                resolve();
            });
        });

        console.log("🔄 Syncing tables...");
        await sequelize.sync({ alter: true }); // Updates the schema
        console.log("✅ Tables synced successfully!");

        console.log("🚀 Running seeders...");
        await new Promise((resolve, reject) => {
            exec("npx sequelize-cli db:seed:all", (error, stdout, stderr) => {
                if (error) {
                    console.error(`❌ Seeder error: ${error.message}`);
                    reject(error);
                }
                if (stderr) console.error(`⚠️ Seeder stderr: ${stderr}`);
                console.log(`✅ Seeder output: ${stdout}`);
                resolve();
            });
        });

        console.log("✅ Database setup completed!");
        process.exit();
    } catch (error) {
        console.error("❌ Error during database setup:", error);
        process.exit(1);
    }
})();
