const { User } = require('../models');

const seedDb = [
    {
        user_id: "1",
        username: "engineer123",
        email: "en@gmail.com",
        password: "Password12345",
    },
    {
        user_id: "2",
        username: "Cindy12",
        email: "cindy@mail.com",
        password: "cindy1",
    },
    {
        user_id: "3",
        username: "thatguy1",
        email: "mail@mail.com",
        password: "123456",
    },
];

const userDb = () => User.bulkCreate(seedDb);

module.exports = userDb;

