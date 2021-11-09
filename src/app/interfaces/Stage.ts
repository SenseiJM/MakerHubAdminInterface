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
    joueurStages: Joueur[];
}