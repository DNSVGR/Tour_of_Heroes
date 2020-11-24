var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var TOKEN_SECRET = '8094e3f0f59d369e9a2419f82884513d6183b9c0b927d969a755e0ba0b215bca50599cfdb60c2f372a3768d268a53eb0e690b45cf518afc1be689a66aa0952e5';
/* GET home page. */
router.post('/genToken', function(req, res, next) {
    console.log(req.body)
    var user = {
        'userName': req.body.userName,
        'password': crypto.createHash('sha256').update(req.body.password).digest('hex')};

    req.mongo.db("heroesTour").collection('users').find(user).toArray(function(err, result){
        console.log(result);
        if(result.length < 1) {
            res.sendStatus(401);
            return;
        }
        var token = jwt.sign(req.body.userName, TOKEN_SECRET);
        res.json(token);
    });
});
router.post('/addUser', function(req, res, next){
    var user = {'userName': req.body.userName};
    req.mongo.db('heroesTour').collection('users').find(user).toArray(function(err, result){
        console.log(result);
        if (result.length < 1){
            user.password = crypto.createHash('sha256').update(req.body.password).digest('hex');

            req.mongo.db('heroesTour').collection('users').insert(user);
            var token = jwt.sign(req.body.userName, TOKEN_SECRET);
            res.end(token)
        } else {
            res.sendStatus(401);
        }
    })

})
router.get('/', function(req, res, next){
    res.end()
})
module.exports = router;