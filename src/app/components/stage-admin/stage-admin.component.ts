import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classements } from 'src/app/enums/classements';
import { Stage } from 'src/app/interfaces/Stage';
import { StageAddDTO } from 'src/app/interfaces/StageAddDTO';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-stage-admin',
  templateUrl: './stage-admin.component.html',
  styleUrls: ['./stage-admin.component.css']
})
export class StageAdminComponent implements OnInit {

  listeStages : Stage[] = [];
  listeClassements: string[] = Object.keys(Classements);

  days = Array(31).fill('').map((x,i) => i + 1 );
  months = Array(12).fill('').map((x,i) => i + 1 );
  years = Array(50).fill('').map((x,i) => i + (new Date()).getFullYear());
  hours = Array(24).fill('').map((x, i) => i);
  minutes = Array(12).fill('').map((x, i) => i * 5);

  formGroup : FormGroup = this._formBuild.group({});

  isShown : boolean = false;
  selectedJourDebut : number = 0;
  selectedMoisDebut : number = 0;
  selectedAnneeDebut : number = 0;
  selectedHeureDebut : number = 0;
  selectedMinuteDebut : number = 0;
  selectedJourFin : number = 0;
  selectedMoisFin : number = 0;
  selectedAnneeFin : number = 0;
  selectedHeureFin : number = 0;
  selectedMinuteFin : number = 0;

  displayAddModal : boolean = false;

  constructor(private _sService : StageService, private _formBuild : FormBuilder) { }

  ngOnInit(): void {

    this.chargerListeStages();
    console.log(this.listeClassements);
    
  }

  chargerListeStages() {
    this._sService.GetAll().subscribe(
      (listFromApi : Stage[]) => {
        this.listeStages = listFromApi;
        for (let stage of this.listeStages) {
          stage.dateDebut = new Date(stage.dateDebut);
          stage.dateFin = new Date(stage.dateFin);
        }
      }
    );
  }

  addStage() {
    this.displayAddModal = true;
    this.formGroup = this._formBuild.group({
      titre : [null, [Validators.required]],
      jourDebut : [1, [Validators.required]],
      moisDebut : [1, [Validators.required]],
      anneeDebut : [this.years[0], [Validators.required]],
      jourFin : [1, [Validators.required]],
      moisFin : [1, [Validators.required]],
      anneeFin : [this.years[0], [Validators.required]],
      heureDebut : [this.hours[0], [Validators.required]],
      minuteDebut : [this.minutes[0], [Validators.required]],
      heureFin : [this.hours[0], [Validators.required]],
      minuteFin : [this.minutes[0], [Validators.required]],
      prixAffilies : [0, [Validators.required]],
      prixExternes : [0, [Validators.required]],
      classementMinimum : [Classements.NC, [Validators.required]],
      classementMaximum : [Classements.B6, [Validators.required]],
      entraineur : [null, [Validators.required]],
      nombreMax : [0],
      description : [null, [Validators.required]]
    });
    this.isShown = true;
  }

  submit() {

    let dateDeb = new Date(this.formGroup.value["anneeDebut"], this.formGroup.value["moisDebut"], this.formGroup.value["jourDebut"]);
    let dateFin = new Date(this.formGroup.value["anneeFin"], this.formGroup.value["moisFin"], this.formGroup.value["jourFin"]);

    console.log("debut " , dateDeb);
    console.log("fin ", dateFin);

    let nouvStage : StageAddDTO = {
      titre: this.formGroup.value["titre"],
      dateDebut: dateDeb,
      dateFin: dateFin,
      heureDebut: this.formGroup.value["heureDebut"] + "h" + this.formGroup.value["minuteDebut"],
      heureFin: this.formGroup.value["heureFin"] + "h" + this.formGroup.value["minuteFin"],
      prixAffilies: this.formGroup.value["prixAffilies"],
      prixExternes: this.formGroup.value["prixExternes"],
      classementMinimum: this.formGroup.value["classementMinimum"],
      classementMaximum: this.formGroup.value["classementMaximum"],
      entraineur: this.formGroup.value["entraineur"],
      nombreMax: this.formGroup.value["nombreMax"],
      description: this.formGroup.value["description"]
    }

    this._sService.AddStage(nouvStage).subscribe(
      () => {
        this.chargerListeStages();
      }
      );
    this.isShown = false;

  }

  deleteStage(id : number) {
    this._sService.Delete(id).subscribe(
      () => {
        this.chargerListeStages();
      }
    )
  }

  detailsAnnonce() {
    //TODO (New page OR Modal ??????) -> Khun
  }

}
