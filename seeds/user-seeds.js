const { Post } = require('../models');

const seedDb = [
    {}
]

const usersDb = () => Post.bulkCreate (seedDb);

module.exports = usersDb;

