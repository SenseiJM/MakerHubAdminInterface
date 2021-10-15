import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stage } from 'src/app/interfaces/Stage';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-stage-admin',
  templateUrl: './stage-admin.component.html',
  styleUrls: ['./stage-admin.component.css']
})
export class StageAdminComponent implements OnInit {

  listeStages : Stage[] = [];

  formGroup : FormGroup = this._formBuild.group({});

  isShown : boolean = false;

  constructor(private _sService : StageService, private _formBuild : FormBuilder) { }

  ngOnInit(): void {

    this.chargerListeStages();
    

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

  showForm() {
    this.formGroup = this._formBuild.group({
      titre : [null, [Validators.required]],
      dateDebut : [null, [Validators.required]],
      dateFin : [null, [Validators.required]],
      heureDebut : [null, [Validators.required]],
      heureFin : [null, [Validators.required]],
      prixAffilies : [null, [Validators.required]],
      prixExternes : [null, [Validators.required]],
      idClassementMinimum : [null, [Validators.required]],
      idClassementMaximum : [null, [Validators.required]],
      entraineur : [null, [Validators.required]],
      nombreMax : [null],
      description : [null, [Validators.required]]
    }, Validators.required);
    this.isShown = true;
  }

  submit() {

    this._sService.AddStage(this.formGroup.value).subscribe(
      () => {
        this.chargerListeStages();
        this.isShown = false;
      }
    );

  }

}
