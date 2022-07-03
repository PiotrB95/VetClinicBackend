import {PetEntity} from "../types";
import {ValidationError} from "../error/error";

interface NewPetEntity extends Omit<PetEntity, 'id'>{
    id?: string;
}

export class PetRecord implements PetEntity{
    id: string;
    petName: string;
    petType: string;
    petAge: number;
    ownerName: string;
    ownerPhone: number;
    lastVaccinate: Date;
    nextVaccinate: Date;

    constructor(obj: PetEntity) {
        if(!obj.petName || obj.petName.length > 36){
            throw new ValidationError('Nie podano imienia zwierzęcia, bądź jego imię jest dłuższe niż 36 znaków.')
        }

        if(!obj.petType || obj.petType.length > 36){
            throw new ValidationError('Nie podano gatunku zwierzęcia, bądź jego nazwa jest dłuższa niż 36 znaków.')
        }

        if(!obj.petAge || obj.petAge > 100){
            throw new ValidationError('Nie podano wieku zwierzęcia, bądź ma ono ponad 100 lat.')
        }

        if(!obj.ownerName || obj.ownerName.length > 36){
            throw new ValidationError('Nie podano właściciela zwierzęcia, bądź jego imię jest dłuższe niż 36 znaków.')
        }

        if(!obj.ownerPhone || obj.ownerPhone < 10000000 || obj.ownerPhone > 999999999){
            throw new ValidationError('Podano nieprawidłowy numer telefonu właściciela.')
        }

        if(!obj.lastVaccinate){
            throw new ValidationError('Nie podano daty ostatniego szczepienia.')
        }
    }
}