var express = require('express');
var router = express.Router();
var heroesRouter = require("./heroes");
var heroClassesRouter = require('./heroClasses');
var attackTypesRouter = require('./attackTypes');
const { route } = require('.');
/* GET home page. */
router.use('/heroes', heroesRouter);
router.use('/heroClasses', heroClassesRouter);
router.use('/attackTypes', attackTypesRouter);
router.get('/', function(req, res, next) {
  res.send("asdasd");
});

module.exports = router;
