const { Comment } = require('../models')

const sendComments = [
    {
        user_id: 1, 
        post_id: 1,
        comment_text: "Tech blogs are pretty sweet.",
    },
    {
        user_id: 2, 
        post_id: 2, 
        comment_text: "I counted 200.",
    },
    {
        user_id: 3, 
        post_id: 3, 
        comment_text: "Oh, I do.",
    },
]

const commentDb = () => Comment.bulkCreate(sendComments); 

module.exports = commentDb;

