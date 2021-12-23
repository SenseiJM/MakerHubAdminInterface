import { TypeSoupers } from "../enums/typeSoupers";

export interface Souper {
    id: number;
    date: string;
    realdate: Date;
    typeSouper: TypeSoupers;
    prixAffilies: number;
    prixExternes: number;
    description: string;
    photo: string;
    nombreMax: number;
    titre: string;
}