var express = require('express');
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
  if (req.query.attackTypeId){
    res.send(heroClasses.find(el => (el.attackTypeId == req.query.attackTypeId)));
} else
  res.send(heroClasses);
});
router.delete('/:heroClassId', function(req, res, next){
  heroClasses.splice(heroClasses.findIndex(el => el.id == req.params.heroClassId), 1);
  res.send(heroClasses);
});
router.post('/', function(req, res, next){
  req.body.id = heroClasses[heroClasses.length-1].id+1;
  heroClasses.push(req.body)
  res.send(req.body);
})
module.exports = router;
