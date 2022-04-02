const seedItems = require('./item-seeds');
const seedUser = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n---- DATABASE SYNCED ----\n');
    await seedUser();
    console.log('\n---- USERS SEEDED ----\n');
    await seedItems();
    console.log('\n---- ITEMS SEEDED ----\n');

    process.exit(0);
};

seedAll();