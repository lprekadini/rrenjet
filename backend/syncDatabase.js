const sequelize = require('./db');
const { Personality, Category } = require('./models');

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("✅ Tabelat u krijuan me sukses në MySQL!");
        process.exit();
    } catch (error) {
        console.error("❌ Gabim gjatë sinkronizimit të databazës:", error);
    }
})();