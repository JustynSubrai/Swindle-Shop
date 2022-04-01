const router = require('express').Router();
const sequelize = require('../config/connection');
const { Item, User} = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Item.findAll({
    include: [
      {
          model: User,
          attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
// router.get('/post/:id', (req, res) => {
//   Item.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }

//       const post = dbPostData.get({ plain: true });

//       res.render('single-post', {
//         post,
//         loggedIn: req.session.loggedIn
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get('/login', (req, res) => {
  console.log('========hellOOOOO========');
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
