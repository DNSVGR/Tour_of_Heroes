var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
   
    req.mongo.db("heroesTour").collection("heroes").aggregate([
        {
            $lookup:
            {
                from: "heroClasses",
                localField:"heroClass",
                foreignField: "_id",
                as: "heroClass"
            }
            
        }
    ]).toArray().then(function(ans){
        console.log(ans);
        res.send(ans);
    });
});
router.post('/', function(req, res, next){
    req.mongo.db("heroesTour").collection("heroes").insert(req.body);
    res.send();
});
router.put('/', function(req, res, next){
    var filter = { "_id": ObjectId(req.body._id)}
    delete req.body._id;
    req.body.heroClass = req.body.heroClass._id;
    req.mongo.db("heroesTour").collection("heroes").updateOne(filter, {
        $set: req.body
    })
    res.send(req.body);
});
router.delete('/:heroId', function(req, res, next){
    var filter = {"_id": ObjectId(req.params.heroId)}
    req.mongo.db("heroesTour").collection("heroes").deleteOne(filter);
    res.send();
})
router.get('/:heroId', function(req, res, next){
    var filter = {"_id": ObjectId(req.params.heroId)}
    req.mongo.db("heroesTour").collection("heroes").aggregate([
        {
            $lookup:
            {
                from: "heroClasses",
                localField:"heroClass",
                foreignField: "_id",
                as: "heroClass"
            }
        },
        { $match : { _id : ObjectId(req.params.heroId) } }
    ]).toArray().then(function(ans){
        console.log(ans);
        res.send(ans);
    });
});
module.exports = router;
