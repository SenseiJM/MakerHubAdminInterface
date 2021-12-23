export interface StageAddDTO {
    titre: string;
    dateDebut: Date;
    dateFin: Date;
    heureDebut: string;
    heureFin: string;
    prixAffilies: number;
    prixExternes: number;
    classementMinimum: number;
    classementMaximum: number;
    entraineur: string;
    nombreMax?: number;
    description: string;
}