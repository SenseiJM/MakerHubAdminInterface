import { TypeSoupers } from "../enums/typeSoupers";

export interface SouperAddDTO {
    date: Date;
    typeSouper: TypeSoupers;
    prixAffilies: number;
    prixExternes: number;
    description: string;
    photo: string;
    nombreMax: number;
    titre: string;
    mimeType: string;
}