enum Range {
    Melee = "Melee",
    Ranged = "Ranged"
}

export default interface AttackType{
    id: number;
    range: Range;
    typeDesc: string;

}