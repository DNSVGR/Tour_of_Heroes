var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();
const Range = {
    Melee: "Melee",
    Ranged: "Ranged"
}
const attackTypes = [
    {id: 1, range: Range.Melee, desc: "axe+shield"},
    {id: 2, range: Range.Ranged, desc: "bow"},
    {id: 3, range: Range.Ranged, desc: "staff"},
    {id: 4, range: Range.Melee, desc: "mace"},
    {id: 5, range: Range.Melee, desc: "For delete"}
  ];
var heroClasses = [
    {id: 1, className: "Warrior", attackTypeId: 1, attackType: attackTypes[0]},
    {id: 2, className: "Paladin", attackTypeId: 4, attackType: attackTypes[3]},
    {id: 3, className: "Hunter", attackTypeId: 2, attackType: attackTypes[1]},
    {id: 4, className: "Priest", attackTypeId: 3, attackType: attackTypes[2]},
    {id: 5, className: "Shaman", attackTypeId: 3, attackType: attackTypes[2]},
    {id: 6, className: "for deleting", attackTypeId: 4, attackType: attackTypes[2]}
  ];


/* GET home page. */
router.get('/', function(req, res, next) {
  var filter;
  if (req.query.attackTypeId){
    filter = {"attackType": new ObjectId(req.query.attackTypeId)}
  }
  // req.mongo.db("heroesTour").collection("heroClasses").find(filter).toArray().then(ans => {
  //   res.send(ans);
  // });
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
