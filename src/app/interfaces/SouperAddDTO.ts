import { TypesSoupers } from "../enums/typeSoupers";

export interface SouperAddDTO {
    date: Date;
    typeSouper: TypesSoupers;
    prixAffilies: number;
    prixExternes: number;
    description: string;
    urlPhoto: string;
    nombreMax: number;
    titre: string;
}