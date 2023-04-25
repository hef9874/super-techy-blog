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
            post_id: req.body.post_id
        })
        .then(commentDb => res.json(commentDb))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
})

router.delete('/:id', withAuth, (req, res) => {
    Comment.delete({
        where: {
            id: req.params.id
        }
    })
    .then(commentDb => {
        if(!commentDb) {
            console.log(err)
            res.status(404).json({ message: 'Sorry, there are no comments for this user' });
            return;
        }
    });
});

module.exports = router;