export enum Range {
    Melee = "Melee",
    Ranged = "Ranged"
}
export interface AttackType{
    _id: number;
    range: Range;
    desc: string;
}
export interface HeroClass {
    _id: number;
    className: string;
    attackType: AttackType;
}
export interface Hero {
    _id: string;
    name: string;
    heroClass: HeroClass;
    level: number;
    age: number;
    faction: String;
}
