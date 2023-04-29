const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//making dashboard with posts
router.get('/', withAuth, async (req, res) => {
    try{
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
                        attributes: ['username', 'github']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'github'],
                }
            ]
        })
         // serialize data 
        const allPosts = dashboardDb.map(post => post.get({ plain: true }));
        res.render('dashboard', { allPosts, loggedIn: true });

    } catch(err) {
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
            attributes: ['id', 'title','created_at', 'post_content'],
            include: [
                {
                model: User,
                attributes: ['username', 'github'],
            }
        ]
        })
        if(!editDb) {
            res.status(404).json({ message: 'Id does not exist' });
            return;
        }

        res.render('edit-post', {
            Post, 
            loggedIn: true
        })

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})