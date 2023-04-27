const router = require('express').Router();
const { Post, User, Comment } = require('../../models/');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

//Route getting requests on root url - when request is received the handler function executes a db query to retrieve posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User, 
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
    //results returned in JSON format
    .then(postDb => res.json(postDb))
    .catch(err => {
        res.status(500).json(err);
    });
});

//get a single row from the post table that matches the specified ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User, 
                    attribute: ['username']
                }
            },
            {
            model: User,
            attributes: ['username']
            },
        ]
    })
    // if the post with the ID is found, result shown 
    .then(postDb => {
        if(!postDb) {
            res.status(404).json({ message: 'ID does not exist' });
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post-content,
        user_id: req.session.user_id,
    })
    .then(postDb => res.json(postDb))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title, 
            post_content: req.body.post_content,
        },
        {
            where: {
                id: req.params.id,
            }
        }
    ) 
    .then(postDb => {
        if(!postDb) {
            res.status(404).json({ message: 'ID does not exist' });
            return;
        }
        res.json(postDb);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id,
        }
    })
    .then(postDb => {
        if(!postDb) {
            res.status(404).json({ message: 'ID does not exist'});
            return;
        }
        res.json(postDb);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

modules.exports = router;