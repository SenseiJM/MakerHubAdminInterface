import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeSoupers } from 'src/app/enums/typeSoupers';
import { JoueurSouperIndexDTO } from 'src/app/interfaces/JoueurSouper';
import { Souper } from 'src/app/interfaces/Souper';
import { SouperAddDTO } from 'src/app/interfaces/SouperAddDTO';
import { JoueurSouperService } from 'src/app/services/joueur-souper.service';
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

  listeTypes: any[] = [{
    name: "A Emporter",
    value: TypeSoupers.aEmporter
  }, {
    name: "Sur Place",
    value: TypeSoupers.surPlace
  }];

  formGroup: FormGroup = this._formbuild.group({});
  isShown: boolean = false;
  displayAddModal: boolean = false;
  displayDetailsModal: boolean = false;
  displayEditModal: boolean = false;

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

  selectedSouper!: Souper;

  commandes: JoueurSouperIndexDTO[] = [];

  constructor(private _sService: SouperService, private _jsService: JoueurSouperService, private _formbuild: FormBuilder) { }

  ngOnInit(): void {
    this.chargerListeSoupers();    
  }

  chargerListeSoupers() {
    this._sService.GetAll().subscribe(
      (listFromApi: Souper[]) => {
        this.listeSoupers = listFromApi.map(s => {
          s.realdate = new Date(s.date);
          return s;
        });
        this.selectedSouper = this.listeSoupers[0];
      }
    );
  }

  addSouper() {
    this.displayAddModal = true;
    this.formGroup = this._formbuild.group({
      jour: [1, [Validators.required]],
      mois: [1, [Validators.required]],
      annee: [this.years[0], [Validators.required]],
      typeSouper: [TypeSoupers.aEmporter, [Validators.required]],
      prixAffilies: [0, [Validators.required]],
      prixExternes: [0, [Validators.required]],
      description: [null, [Validators.required]],
      photo: [null],
      fileSize: [null, [CustomValidators.ValidateImageSize((1024 * 1024) * 2)]],
      mimeType: [null, [CustomValidators.ValidateMimeTypes('image/jpeg', 'image/png', 'image/svg')]],
      nombreMax: [0, [Validators.required]],
      titre: [null, [Validators.required]]
    });
    this.isShown = true;
  }

  modifySouper() {
    this.displayEditModal = true;
    this.selectedJour = +this.selectedSouper.date.split("-")[2].split("T")[0]; //Le  + fait l'équivalent d'un parseInt()
    this.selectedMois = +this.selectedSouper.date.split("-")[1];
    this.selectedAnnee = +this.selectedSouper.date.split("-")[0];
    this.formGroup = this._formbuild.group({
      jour: [this.selectedJour, [Validators.required]],
      mois: [this.selectedMois, [Validators.required]],
      annee: [this.selectedAnnee, [Validators.required]],
      typeSouper: [this.selectedSouper.typeSouper, [Validators.required]],
      prixAffilies: [this.selectedSouper.prixAffilies, [Validators.required]],
      prixExternes: [this.selectedSouper.prixExternes, [Validators.required]],
      description: [this.selectedSouper.description, [Validators.required]],
      photo: [this.selectedSouper.photo],
      fileSize: [null, [CustomValidators.ValidateImageSize((1024 * 1024) * 2)]],
      mimeType: [null, [CustomValidators.ValidateMimeTypes('image/jpeg', 'image/png', 'image/svg')]],
      nombreMax: [this.selectedSouper.nombreMax, [Validators.required]],
      titre: [this.selectedSouper.titre, [Validators.required]]
    });
    this.isShown = true;
    console.log(this.formGroup);
  }

  deleteSouper() {
    this._sService.Delete(this.selectedSouper.id).subscribe(
      () => {
        this.chargerListeSoupers();
        this.isShown = false;
        this.displayDetailsModal = false;
      }
    )
  }

  submit() {
    console.log(this.formGroup)
    let date: string = this.formGroup.value["annee"] + "-" + this.addZero(this.formGroup.value["mois"]) + "-" + this.addZero(this.formGroup.value["jour"]);

    let nouvSouper : SouperAddDTO = {
      date: date,
      ...this.formGroup.value,
    }

    this._sService.AddSouper(nouvSouper).subscribe(
      () => {  
        this.chargerListeSoupers();
        this.isShown = false;
        this.displayAddModal = false;
      }
    );
  }

  submitEdit() {
    console.log(this.formGroup)
    let date: string = this.formGroup.value["annee"] + "-" + this.addZero(this.formGroup.value["mois"]) + "-" + this.addZero(this.formGroup.value["jour"]);

    let nouvSouper : SouperAddDTO = {
      date: date,
      ...this.formGroup.value,
    }

    this._sService.Update(this.selectedSouper.id, nouvSouper).subscribe(
      () => {  
        this.chargerListeSoupers();
        this.isShown = false;
        this.displayEditModal = false;
      }
    );
  }

  showDetailsSouper(id: number) {
    this._sService.GetByID(id).subscribe(
      (souperFromApi: Souper) => {
        this.selectedSouper = souperFromApi;
        this._jsService.GetBySouperID(this.selectedSouper.id).subscribe(
          (listFromApi: JoueurSouperIndexDTO[]) => {
            this.commandes = listFromApi;
          }
        )  
      }
    );
    this.displayDetailsModal = true;
  }

  imageConversion($event: any) {
    
    let fileReader = new FileReader();

    this.formGroup.get("fileSize")?.setValue($event.target.files[0].size);
    fileReader.readAsDataURL($event.target.files[0]);
    fileReader.onload = e => {
      console.log(e.target?.result);
      
      this.formGroup.get("photo")?.setValue((<string>e.target?.result)?.split(",")[1]);
      this.formGroup.get("mimeType")?.setValue((<string>e.target?.result)?.split(",")[0].replace('data:', '').replace(';base64', ''));
    } 
  }

  clickPhoto() {
    this.photo.nativeElement.click();
  }

  private addZero(nombre: number) {
    return ("0" + nombre).slice(-2);
  }

}
