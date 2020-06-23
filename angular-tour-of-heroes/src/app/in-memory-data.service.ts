import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero, Range, HeroClass } from './hero';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
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
    const heroes = [
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
    return {heroes, heroClasses, attackTypes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  
}