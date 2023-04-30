const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//making dashboard with posts
router.get('/', withAuth, async (req, res) => {
    try {
        const dashboardDb = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['id', 'title', 'created_at', 'post_content'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: 'username',
                    }
                },
                {
                    model: User,
                    attributes: 'username',
                }
            ]
        });
        // serialize data 
        const allPosts = dashboardDb.map(post => post.get({ plain: true }));
        res.render('dashboard', { allPosts, loggedIn: true });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//edit page
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const editDb = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'title', 'created_at', 'post_content'],
            include: [
                {
                    model: User,
                    attributes: 'username',
                }
            ]
        })
        if (!editDb) {
            res.status(404).json({ message: 'Id does not exist' });
            return;
        }

        const postEdit = editDb.get({ plain: true })

        res.render('edit-post', {
            postEdit,
            loggedIn: true
        })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/create', withAuth, async (req, res) => {
    try {
        const create = await Post.findAll({
            where: {
                // use the ID from the session
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username', 'twitter', 'github']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                }
            ]
        });

        const newPost = create.map(post => post.get ({ plain: true }));
        res.render('newPost', {newPost, loggedIn:true });

      } catch(err) {
        console.log(err);
        res.status(500).json(err);
      }
    });


module.exports = router;