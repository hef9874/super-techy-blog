const { Post } = require('../models')

const dbData = [
    {
        'id': 2,
        'title': 'WOW, THIS BLOG ROCKS',
        'post_text': 'Look at it. ',
        'user_id': 3
     }
]

const postsDb = () => Post.bulkCreate(dbData);

module.exports = postsDb;