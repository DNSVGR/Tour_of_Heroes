var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();



router.get('/', function(req, res, next) {
  var filter;
  if (req.query.attackTypeId){
    filter = {"attackType": new ObjectId(req.query.attackTypeId)}
  }

  req.mongo.db("heroesTour").collection("heroClasses").aggregate([
    {
        $lookup:
        {
            from: "attackTypes",
            localField:"attackType",
            foreignField: "_id",
            as: "attackType"
        }
    }
  ]).toArray().then(function(ans){
      console.log(ans);
      res.send(ans);
  });
});
router.delete('/:heroClassId', function(req, res, next){
  var filter = {"_id": ObjectId(req.params.heroClassId)}
  req.mongo.db("heroesTour").collection("heroClasses").deleteOne(filter);
  res.send();
});
router.post('/', function(req, res, next){
  req.body.attackType = ObjectId(req.body.attackType._id);
  delete req.body.id;
  req.mongo.db("heroesTour").collection("heroClasses").insert(req.body);
  res.send(req.body);
})
module.exports = router;
