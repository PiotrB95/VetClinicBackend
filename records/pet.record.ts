import {PetEntity, PetRecordResults} from "../types";
import {ValidationError} from "../error/error";
import {pool} from "../utils/db";

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

        if(!obj.lastVaccinate){
            throw new ValidationError('Nie podano daty kolejnego szczepienia.')
        }

        this.id = obj.id;
        this.petName = obj.petName;
        this.petType = obj.petType;
        this.petAge = obj.petAge;
        this.ownerName = obj.ownerName;
        this.ownerPhone = obj.ownerPhone;
        this.lastVaccinate = obj.lastVaccinate;
        this.nextVaccinate = obj.nextVaccinate;
    }

    static async getOnePet(id: string): Promise<PetRecord |null> {
        const [results] = await pool.execute("SELECT * FROM `pets` WHERE id = :id",{
            id,
        }) as PetRecordResults;

        return results.length === 0 ? null : new PetRecord(results[0]);
    }
}