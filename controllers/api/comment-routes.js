const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentDb => res.json(commentDb))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/', withAuth, (rec, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            

        })
    }
})