export interface StageAddDTO {
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
}