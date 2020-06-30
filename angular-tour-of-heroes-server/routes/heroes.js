var express = require('express');
var router = express.Router();
/* GET home page. */
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
  const heroClasses = [
    {id: 1, className: "Warrior", attackTypeId: 1, attackType: attackTypes[0]},
    {id: 2, className: "Paladin", attackTypeId: 4, attackType: attackTypes[3]},
    {id: 3, className: "Hunter", attackTypeId: 2, attackType: attackTypes[1]},
    {id: 4, className: "Priest", attackTypeId: 3, attackType: attackTypes[2]},
    {id: 5, className: "Shaman", attackTypeId: 3, attackType: attackTypes[2]},
    {id: 6, className: "for deleting", attackTypeId: 4, attackType: attackTypes[2]}
  ];
  var heroes = [
    { id: 11, name: 'Dr Nice', heroClassId:1, heroClass: heroClasses[0], level: 21, age: 102, faction: "Allience" },
    { id: 12, name: 'Narco' , heroClassId:3, heroClass: heroClasses[2], level: 23, age: 102, faction: "Allience" },
    { id: 13, name: 'Bombasto', heroClassId:2, heroClass: heroClasses[1], level: 24, age: 102, faction: "Allience"  },
    { id: 14, name: 'Celeritas', heroClassId:4, heroClass: heroClasses[3], level: 26, age: 102, faction: "Allience"  },
    { id: 15, name: 'Magneta', heroClassId:3, heroClass: heroClasses[2], level: 24, age: 102, faction: "Legion"  },
    { id: 16, name: 'RubberMan', heroClassId:5, heroClass: heroClasses[4], level: 81, age: 102, faction: "Allience"  },
    { id: 17, name: 'Dynama', heroClassId:1, heroClass: heroClasses[0], level: 23, age: 102, faction: "Legion"  },
    { id: 18, name: 'Dr IQ', heroClassId:4, heroClass: heroClasses[3], level: 41, age: 102, faction: "Legion"  },
    { id: 19, name: 'Magma', heroClassId:2, heroClass: heroClasses[1], level: 64, age: 102, faction: "Allience"  },
    { id: 20, name: 'Tornado', heroClassId:1, heroClass: heroClasses[0], level: 11, age: 102, faction: "Allience"  }
  ];
router.get('/', function(req, res, next) {
    if (req.query.heroClassId){
        res.send(heroes.find(el => (el.heroClassId == req.query.heroClassId || el.name == req.query.name)));
    } else
    res.send(heroes)
});
router.put('/', function(req, res, next){
    heroes[heroes.findIndex(el => el.id == req.body.id)] = req.body
    console.log(heroes[0]);
    res.send();
});
router.post('/', function(req, res, next){
    req.body.id = heroes[heroes.length-1].id+1;
    heroes.push(req.body)
    console.log(heroes[heroes.length-1]);
    res.send(req.body);
});
router.delete('/:heroId', function(req, res, next){
    heroes.splice(heroes.findIndex(el => el.id == req.params.heroId), 1);
    res.send();
})
router.get('/:heroId', function(req, res, next){
    console.log("heroid: ", req.params.heroId)
    res.send(heroes.find(el => el.id == req.params.heroId));
});
router.get('/:heroName', function(req, res, next){
    res.send(heroes.find(el => el.name == req.params.heroName));
})
module.exports = router;
