var express = require('express');
const { route } = require('.');
const { ObjectId } = require('mongodb');
var router = express.Router();
const Range = {
    Melee: "Melee",
    Ranged: "Ranged"
}
var attackTypes = [
    {id: 1, range: Range.Melee, desc: "axe+shield"},
    {id: 2, range: Range.Ranged, desc: "bow"},
    {id: 3, range: Range.Ranged, desc: "staff"},
    {id: 4, range: Range.Melee, desc: "mace"},
    {id: 5, range: Range.Melee, desc: "For delete"}
  ];

/* GET home page. */
router.get('/', function(req, res, next) {
  req.mongo.db("heroesTour").collection("attackTypes").find().toArray().then(ans => {
    res.send(ans)
  })
});
router.delete('/:attackTypeId', function(req, res, next){
  var filter = {"_id": ObjectId(req.params.attackTypeId)}
  console.log(filter);
  req.mongo.db("heroesTour").collection("attackTypes").deleteOne(filter);
  res.send();
})
router.post('/', function(req, res, next){
  delete req.body.id;
  req.mongo.db("heroesTour").collection("attackTypes").insert(req.body);
  res.send(req.body);
})
module.exports = router;
