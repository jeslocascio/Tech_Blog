const sequelize = require('../config/connection');
const seedComments = require('./commentSeeds');
const seedPosts = require('./postSeeds');
const userInfo = require('./userSeeds');

const seedTogether = async () => {
    try {
        await sequelize.sync({force: true});
        console.log("Database is synced.");
        await userInfo();
        console.log("User Data is synced.");
        await seedPosts();
        console.log("Posts are synced.");
        await seedComments();
        console.log("Comments are synced.");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedTogether();

