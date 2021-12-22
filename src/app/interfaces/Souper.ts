import { TypesSoupers } from "../enums/typeSoupers";

export interface Souper {
    id: number;
    date: Date;
    typeSouper: TypesSoupers;
    prixAffilies: number;
    prixExternes: number;
    description: string;
    urlPhoto: string;
    nombreMax: number;
    titre: string;
}