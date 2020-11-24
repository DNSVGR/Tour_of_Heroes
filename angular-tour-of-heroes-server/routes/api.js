var express = require('express');
var router = express.Router();
var heroesRouter = require("./heroes");
var heroClassesRouter = require('./heroClasses');
var attackTypesRouter = require('./attackTypes');
var authRouter = require('./auth.js');
var TOKEN_SECRET = '8094e3f0f59d369e9a2419f82884513d6183b9c0b927d969a755e0ba0b215bca50599cfdb60c2f372a3768d268a53eb0e690b45cf518afc1be689a66aa0952e5';
var jwt = require('jsonwebtoken');
const { route } = require('.');
/* GET home page. */
router.use('/auth', authRouter);
router.use(function(req, res, next){
  if('OPTIONS' === req.method) {
    res.send(200);
    
  }
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    
    next();
  })
})
router.use('/heroes', heroesRouter);
router.use('/heroClasses', heroClassesRouter);
router.use('/attackTypes', attackTypesRouter);
router.get('/', function(req, res, next) {
  res.send("wrong route");
});

module.exports = router;
