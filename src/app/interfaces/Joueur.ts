export interface Joueur {
    id : number;
    nom : string;
    prenom : string;
    idClassementHommes : number;
    idClassementDames? : number;
    idCategorieAge : number;
    genre : string;
    idEquipeHommes? : number;
    idEquipeDames? : number;
    classementHommes : string;
    classementDames? : string;
    equipeHommes? : string;
    equipeDames? : string;
}