import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypesSoupers } from 'src/app/enums/typeSoupers';
import { Souper } from 'src/app/interfaces/Souper';
import { SouperAddDTO } from 'src/app/interfaces/SouperAddDTO';
import { SouperService } from 'src/app/services/souper.service';
import { CustomValidators } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-souper-admin',
  templateUrl: './souper-admin.component.html',
  styleUrls: ['./souper-admin.component.css']
})
export class SouperAdminComponent implements OnInit {

  @ViewChild("photo") photo! : ElementRef;

  _listeSoupers: Souper[] = [];

  listeTypes: string[] = [TypesSoupers[0], TypesSoupers[1]];

  formGroup: FormGroup = this._formbuild.group({});
  isShown: boolean = false;
  displayAddModal: boolean = false;

  stringRecherche: string = "";

  get listeSoupers() : Souper[] {
    return this._listeSoupers.filter(a => a.titre.toLowerCase().includes(this.stringRecherche.toLowerCase()));
  }

  set listeSoupers(v) {
    this._listeSoupers = v;
  }

  days = Array(31).fill('').map((x,i) => i + 1 );
  months = Array(12).fill('').map((x,i) => i + 1 );
  years = Array(50).fill('').map((x,i) => i + (new Date()).getFullYear());

  selectedJour : number = 0;
  selectedMois : number = 0;
  selectedAnnee : number = 0;

  constructor(private _sService: SouperService, private _formbuild: FormBuilder) { }

  ngOnInit(): void {
    this.chargerListeSoupers();
  }

  chargerListeSoupers() {
    this._sService.GetAll().subscribe(
      (listFromApi: Souper[]) => {
        this.listeSoupers = listFromApi;
      }
    );
  }

  addSouper() {
    this.displayAddModal = true;
    this.formGroup = this._formbuild.group({
      jour: [null, [Validators.required]],
      mois: [null, [Validators.required]],
      annee: [null, [Validators.required]],
      typeSouper: [null, [Validators.required]],
      prixAffilies: [null, [Validators.required]],
      prixExternes: [null, [Validators.required]],
      description: [null, [Validators.required]],
      urlPhoto: [null],
      fileSize: [null, [CustomValidators.ValidateImageSize((1024 * 1024) * 2)]],
      mimeType: [null, [CustomValidators.ValidateMimeTypes('image/jpeg', 'image/png', 'image/svg')]],
      nombreMax: [null, [Validators.required]],
      titre: [null, [Validators.required]]
    });
    this.isShown = true;
    console.log(this.listeTypes);
    
  }

  submit() {

    let date = new Date(this.formGroup.value["annee"], this.formGroup.value["mois"], this.formGroup.value["jour"]);

    let nouvSouper : SouperAddDTO = {
      date: date,
      description: this.formGroup.value["description"],
      nombreMax: this.formGroup.value["nombreMax"],
      prixAffilies: this.formGroup.value["prixAffilies"],
      prixExternes: this.formGroup.value["prixExternes"],
      titre: this.formGroup.value["titre"],
      typeSouper: this.formGroup.value["typeSouper"],
      urlPhoto: this.formGroup.value["urlPhoto"]
    }

    this._sService.AddSouper(nouvSouper).subscribe(
      () => {
        this.chargerListeSoupers();
        this.isShown = false;
      }
    );
  }

  imageConversion($event: any) {
    let fileReader = new FileReader();

    this.formGroup.get("fileSize")?.setValue($event.target.files[0].size);
    fileReader.readAsDataURL<($event.target.files[0]);
    fileReader.onload = e => {
      this.formGroup.get("urlPhoto")?.setValue((<string>e.target?.result)?.split(",")[1]);
      this.formGroup.get("mimeType")?.setValue((<string>e.target?.result)?.split(",")[0].replace('data:', '').replace(';base64', ''));
    } 
  }

  clickPhoto() {
    this.photo.nativeElement.click();
  }

}
