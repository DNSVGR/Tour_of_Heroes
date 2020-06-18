import AttackType from "./attackType";
export interface Hero {
    id: number;
    name: string;
    class: string;
    level: number;
    age: number;
    attackType: AttackType;
    faction: String;
    int: number;
    agi: number;
    str: number;
}