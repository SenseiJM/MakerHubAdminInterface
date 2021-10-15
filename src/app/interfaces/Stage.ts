import { Time } from "@angular/common";
import { Timestamp } from "rxjs";
import { Classement } from "./Classement";
import { Joueur } from "./Joueur";

export interface Stage {
    id: number;
    titre: string;
    dateDebut: Date;
    dateFin: Date;
    heureDebut: string;
    heureFin: string;
    prixAffilies: number;
    prixExternes: number;
    idClassementMinimum: number;
    idClassementMaximum: number;
    entraineur: string;
    nombreMax?: number;
    description: string;
    classementMinimum: Classement;
    classementMaximum: Classement;
    joueurStages: Joueur[];
}