import { Time } from "@angular/common";

export class Equipe {
    id! : number;
    nom! : string;
    idCategorieInterclubs! : number;
    lieuMatch! : string;
    heureMatch! : Time;
    heureDepart? : Time;
    division! : string;
}