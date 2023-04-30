const { DATE } = require('sequelize');
const { Comment } = require('../models')

const sendComments = [
    {
        id: 1,
        user_id: 1, 
        post_id: 1,
        comment_text: "Tech blogs are pretty sweet.",
        created_at: DATE,
    },
    {
        id: 2,
        user_id: 2, 
        post_id: 2, 
        comment_text: "I counted 200.",
        created_at: DATE,
    },
    {
        id: 3,
        user_id: 3, 
        post_id: 3, 
        comment_text: "Oh, I do.",
        created_at: DATE,
    },
]

const commentDb = () => Comment.bulkCreate(sendComments); 

module.exports = commentDb;