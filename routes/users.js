var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  if (req.query.fail)
    res.render('signup', { message: 'Falha no cadastro do usuário!' });
  else
    res.render('signup', { message: null });
});

/* POST users */

router.post('/signup', function (req, res, next) {
  const db = require('../db');
  db.createUser(req.body.username, req.body.password, req.body.email, (err, result) => {
    if (err) return res.redirect('/users/signup?fail=true');
    res.redirect('/');
  })
});

module.exports = router;
