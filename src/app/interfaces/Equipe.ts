import { Time } from "@angular/common";

export interface Equipe {
    id : number;
    nom : string;
    idCategorieInterclubs : number;
    lieuMatch : string;
    heureMatch : Time;
    heureDepart? : Time;
    division : string;
}