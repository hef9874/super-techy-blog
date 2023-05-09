const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentDb = await Comment.findAll()
        res.json(commentDb)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const { comment_text, post_id } = req.body;
      if (!comment_text || !post_id) {
        res.status(400).json({ message: 'Missing comment_text or post_id' });
        return;
      }
      
      const newComment = await Comment.create({
        comment_text: comment_text,
        user_id: req.session.user_id,
        post_id: post_id
      });
  
      res.json(newComment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  


// router.post('/', withAuth, async (req, res) => {
//     try {
//         if (req.session) {
//             const commentDb = await Comment.create({
//                 comment_text: req.body.comment_text,
//                 user_id: req.session.user_id,
//                 post_id: req.body.post_id
//             })
//             res.json(commentDb);
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(400).json(err);
//     };
// });

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(commentDb => {
            if (!commentDb) {
                console.log(err)
                res.status(404).json({ message: 'Sorry, there are no comments for this user' });
                return;
            }
        });
});

module.exports = router;