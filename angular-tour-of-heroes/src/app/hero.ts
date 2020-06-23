export enum Range {
    Melee = "Melee",
    Ranged = "Ranged"
}
export interface AttackType{
    id: number;
    range: Range;
    desc: string;
}
export interface HeroClass {
    id: number;
    className: string;
    attackType: AttackType;
}
export interface Hero {
    id: number;
    name: string;
    heroClass: HeroClass;
    level: number;
    age: number;
    faction: String;
}
