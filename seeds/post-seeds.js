const { Post } = require('../models')

const dbData = [
    {
        id: 1,
        title: 'WOW, THIS BLOG ROCKS',
        post_text: 'Look at it. ',
        user_id: 1
     },
     {
        id: 2,
        title: 'How many users are there?',
        post_text: 'Count them. ',
        user_id: 2
     },
     {
        id: 3,
        title: 'HandleBars',
        post_text: 'Who else hates Handlebars? ',
        user_id: 3
     }
]

const postDb = () => Post.bulkCreate(dbData);

module.exports = postDb;