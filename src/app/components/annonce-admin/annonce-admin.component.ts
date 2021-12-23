import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Annonce } from 'src/app/interfaces/Annonce';
import { AnnonceService } from 'src/app/services/annonce.service';
import { CustomValidators } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-annonce-admin',
  templateUrl: './annonce-admin.component.html',
  styleUrls: ['./annonce-admin.component.css']
})
export class AnnonceAdminComponent implements OnInit {

  @ViewChild("photo") photo! : ElementRef;

  private _listeAnnonces : Annonce[] = [];

  formGroup : FormGroup = this._formBuild.group({});

  isShown : boolean = false;
  displayAddModal : boolean = false;
  displayEditModal : boolean = false;

  stringRecherche : string = "";

  annonceModifie! : Annonce;

  timeStamp! : number;

  get listeAnnonces() : Annonce[] {
    return this._listeAnnonces.filter(a => a.titre.toLowerCase().includes(this.stringRecherche.toLowerCase()));
  }

  set listeAnnonces(v) {
    this._listeAnnonces = v;
  }

  constructor(private _aService : AnnonceService, private _formBuild : FormBuilder) { }

  ngOnInit(): void {

    this.chargerListeAnnonces();

  }

  chargerListeAnnonces() {
    this._aService.GetAll().subscribe(
      (listFromApi : Annonce[]) => {
        this._listeAnnonces = listFromApi;
        this.timeStamp = Date.now();        
      }
    );
  }

  deleteAnnonce(id: number) {
    this._aService.Delete(id).subscribe(
      () => {
        this.chargerListeAnnonces();
      }
    );
  }

  addAnnonce() {
    this.displayAddModal = true;
    this.formGroup = this._formBuild.group({
      titre : [null, [Validators.required]],
      photo : [null],
      fileSize : [null, [CustomValidators.ValidateImageSize((1024 * 1024) * 2)]],
      mimeType : [null, [CustomValidators.ValidateMimeTypes('image/jpeg', 'image/png', 'image/jpg', 'image/svg')]],
      description : [null, [Validators.required]]
    });
    this.isShown = true;
  }

  submit() {        

    this._aService.AddAnnonce(this.formGroup.value).subscribe(
      () => {
        this.chargerListeAnnonces();
        this.isShown = false;
      }
    );
  }

  imageConversion($event : any) {
    let fileReader = new FileReader();
    
    this.formGroup.get("fileSize")?.setValue($event.target.files[0].size);
    fileReader.readAsDataURL($event.target.files[0]);
    fileReader.onload = e => {
      this.formGroup.get("photo")?.setValue((<string>e.target?.result)?.split(",")[1]);
      this.formGroup.get("mimeType")?.setValue((<string>e.target?.result)?.split(",")[0].replace('data:', '').replace(';base64', ''));
    }
  }

  showEditAnnonce(id : number) {
    let modifAnnonce : Annonce;
    this._aService.GetByID(id).subscribe(
      (annonceFromApi : Annonce) => {
        this.annonceModifie = annonceFromApi;
        console.log(annonceFromApi);
        
        this.formGroup.patchValue(this.annonceModifie);
      }
    );
    this.displayEditModal = true;
    this.formGroup = this._formBuild.group({
      id : [null],
      titre : [null, [Validators.required]],
      photo : [null],
      fileSize : [null, [CustomValidators.ValidateImageSize((1024 * 1024) * 2)]],
      mimeType : [null, [CustomValidators.ValidateMimeTypes('image/jpeg', 'image/png', 'image/jpg', 'image/svg')]],
      description : [null, [Validators.required]]
    });

    this.isShown = true;
  }

  confirmEditAnnonce() {
    this._aService.Update(this.formGroup.value, this.annonceModifie.id).subscribe(
      () => {
        this.chargerListeAnnonces();
      }
    );
    this.isShown = false;
    this.displayEditModal = false;
  }

  clickPhoto() {
    this.photo.nativeElement.click();
  }

}
