var express = require('express');
const { route } = require('.');
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
  res.send(attackTypes);
});
router.delete('/:attackTypeId', function(req, res, next){
  attackTypes.splice(attackTypes.findIndex(el => el.id == req.params.attackTypeId), 1);
  res.send();
})
router.post('/', function(req, res, next){
  req.body.id = heroes[heroes.length-1].id+1;
  heroes.push(req.body)
  console.log(heroes[heroes.length-1]);
  res.send(req.body);
})
module.exports = router;
