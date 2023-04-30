const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//get all posts
router.get('/', async (req, res) => {
    try {
        const postsDb = await Post.findAll({
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
                    attributes: ['username']
                }
            ]
        });

        const allPosts = postsDb.map(post => post.get({ plain: true }));
        res.render('homepage', {
            allPosts,
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//get login page

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//get signup page

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post/:id', async(req, res) => {
    try {
        const postDb = await Post.findByPk(req.params.id, {
          include: [
            User,
            {
              model: Comment,
              include: [User],
            },
          ],
        });
    
        if (postData) {
          // serialize data
          const post = postDb.get({ plain: true });
          res.render('post', { post, loggedIn: req.session.loggedIn });
        } else {
          res.status(404).end();
        }
      } catch (err) {
        res.status(500).json(err);
      }
    });


module.exports = router;