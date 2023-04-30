const sequelize = require('../config/connection');
const userDb = require('./user-seeds');
const postDb = require("./post-seeds");
const commentDb = require("./comment-seeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await userDb();
  await postDb();
  await commentDb();

  process.exit(0);
};

seedAll();