const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userDb = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_text', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        });
        if (!userDb) {
            return res.status(404).json({ message: 'There is no user with that ID' });
        }
        return res.json(userDb);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userDb = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (!userDb) {
            res.status(404).json({ message: 'There is no user with that email address' });
            return;
        }
        const rightPassword = await userDb.checkPassword(req.body.password);

        if (!rightPassword) {
            res.status(400).json({ message: 'Wrong password' });
            return;
        }
        req.session.user_id = userDb.id;
        req.session.username = userDb.username;
        req.session.loggedIn = true;

        res.json({ user: userDb, message: 'Logged in' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', withAuth, async (req, res) => {
    try {
        if (req.session.loggedIn) {
            await new Promise((resolve, reject) => {
                req.session.destroy((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const userDb = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id,
            }
        });
        if (!userDb[0]) {
            res.status(404).json({ message: 'ID does not exist' });
            return;
        }
        const updateduserDb = await User.findByPk(req.params.id);
        res.json(updateduserDb);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userDb = await User.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!userDb) {
            res.status(404).json({ message: 'ID does not exist' });
            return;
        }
        res.json(userDb);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;