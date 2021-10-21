import { Component, OnInit } from '@angular/core';
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

  listeAnnonces : Annonce[] = [];

  formGroup : FormGroup = this._formBuild.group({});

  isShown : boolean = false;

  constructor(private _aService : AnnonceService, private _formBuild : FormBuilder) { }

  ngOnInit(): void {

    this.chargerListeAnnonces();

  }

  chargerListeAnnonces() {
    this._aService.GetAll().subscribe(
      (listFromApi : Annonce[]) => {
        this.listeAnnonces = listFromApi;
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

  showForm() {
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
      console.log(e.target?.result);
      this.formGroup.get("photo")?.setValue((<string>e.target?.result)?.split(",")[1]);
      this.formGroup.get("mimeType")?.setValue((<string>e.target?.result)?.split(",")[0].replace('data:', '').replace(';base64', ''));
    }
  }

}
