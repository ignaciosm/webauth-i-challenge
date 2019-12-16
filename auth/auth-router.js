const bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();

const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;
  
  Users.create(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error)
  });
});


router.post('/login', (req, res) => {
  let { username, password } = req.body;
  
  Users.findBy({username}).first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(201).json(user);
      } else {
        res.status(401).json({error: 'You shall not pass!'});
      }
    })
    .catch(error => {
      res.status(500).json(error)
  });
});


router.get('/users', (req, res) => {
  Users.all()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      res.status(500).json(error)
  });
});

module.exports = router;