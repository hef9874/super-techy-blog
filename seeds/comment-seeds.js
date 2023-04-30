const { Comment } = require('../models')

const commentDb = [
    {
        'user_id': 1, 
        'post_id': 5, 
        'comment_text': "Tech blogs are pretty sweet."
    }
]

const commentData = () => Comment.bulkCreate(commentDb); 

module.exports = commentData;