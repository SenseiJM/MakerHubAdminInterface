import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classement } from 'src/app/interfaces/Classement';
import { ClassementService } from 'src/app/services/classement.service';

@Component({
  selector: 'app-classement-admin',
  templateUrl: './classement-admin.component.html',
  styleUrls: ['./classement-admin.component.css']
})
export class ClassementAdminComponent implements OnInit {

  listeClassementsHommes! : Classement[];
  listeClassementsDames! : Classement[];
  formGroup : FormGroup = this._formBuild.group({});

  isShown : boolean = false;

  constructor(private _cService : ClassementService, private _formBuild : FormBuilder) { }

  ngOnInit(): void {
    this.chargerClassements();
  }

  chargerClassements() {

    this.listeClassementsDames = [];
    this.listeClassementsHommes = [];

    this._cService.GetAll().subscribe(
      (listFromApi : Classement[]) => {
        for (let classement of listFromApi) {
          if (classement.denomination[0] != "E") {
            this.listeClassementsDames.push(classement);
          }
          this.listeClassementsHommes.push(classement);
        }
      }
    )
  }

  showForm() {
    this.formGroup = this._formBuild.group({
      denomination : [null, [Validators.required]]
    }, Validators.required);
    this.isShown = true;
  }

  submit() {

    this._cService.AddClassement(this.formGroup.value).subscribe(
      () => {
        this.chargerClassements();
        this.isShown = false;
      }
    );
  }

  deleteClassement(id: number) {
    this._cService.Delete(id).subscribe(
      () => {
        this.chargerClassements();
      }
    );
  }

}
