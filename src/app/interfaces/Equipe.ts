import { Time } from "@angular/common";

export interface Equipe {
    ID : number;
    Nom : string;
    IDCategorieInterclubs : number;
    LieuMatch : string;
    HeureMatch : Time;
    HeureDepart? : Time;
    Division : string;
}