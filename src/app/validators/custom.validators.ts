import { ValidatorFn } from "@angular/forms";

export class CustomValidators {

    //Validator pour l'extension des fichiers
    static ValidateMimeTypes(...mimeTypes : string[]) : ValidatorFn {

        return control => {
            let value : string = <string>control.value;
            if (value == null) {
                return null;
            }

            if (mimeTypes.includes(value)) {
                return null;
            } else {
                return {
                    MimeTypeError : true
                }
            }

        }

    }

    //Validator pour la taille
    static ValidateImageSize(size : number) : ValidatorFn {

        return control => {
            let value : number = control.value;

            if (value == null) {
                return null;
            }

            if (value < size) {
                return null;
            } else {
                return {
                    SizeError : true
                }
            }

        }

    }

}