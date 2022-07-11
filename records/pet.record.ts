import {PetEntity, PetRecordResults} from "../types";
import {ValidationError} from "../error/error";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';

export class PetRecord implements PetEntity{
    id: string;
    petName: string;
    petType: string;
    petAge: number;
    ownerName: string;
    ownerPhone: number;
    lastVaccinate: string;
    nextVaccinate: string;

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

        if(!obj.lastVaccinate || obj.lastVaccinate.length>10){
            throw new ValidationError('Nie podano daty ostatniego szczepienia, lub jest ona nieprawidłowa.')
        }

        if(!obj.nextVaccinate || obj.nextVaccinate.length>10){
            throw new ValidationError('Nie podano daty kolejnego szczepienia, lub jest ona nieprawidłowa.')
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

    static async findAllPets(search: string): Promise<PetRecord[] |null> {
        const [results] = await pool.execute("SELECT * FROM `pets` WHERE petName LIKE :search OR petType LIKE :search OR ownerName LIKE :search ",{
            search: `%${search}%`,
        }) as PetRecordResults;

        return results.map(result => new PetRecord(result));
    }

    async insert(): Promise<void>{
        if(!this.id){
            this.id = uuid();
        }else{
            throw new Error('Cannot add pet, its already in database.')
        };

        await pool.execute("INSERT INTO `pets` (`id`, `petName`, `petType`, `petAge`, `ownerName`, `ownerPhone`, `lastVaccinate`, `nextVaccinate`) VALUES (:id, :petName,:petType, :petAge, :ownerName, :ownerPhone, :lastVaccinate, :nextVaccinate)", this );
    }

     static async delete(id: string): Promise<void>{
        if(!id){
            throw new Error('Cannot delete pet without ID');
        }

        const petToDelete = await PetRecord.getOnePet(id);
        if(!petToDelete){
            throw new Error('No such pet in database')
        }

        await pool.execute("DELETE FROM `pets` WHERE id = :id",{
            id,
        });
    }

    static async update(id: string, lastVaccinate:string, nextVaccinate: string): Promise<void>{
        if(!id){
            throw new Error('Cannot update pet without ID');
        }
        const petToDelete = await PetRecord.getOnePet(id);
        if(!petToDelete){
            throw new Error('No such pet in database')
        }

        await pool.execute("UPDATE `pets` SET lastVaccinate = :lastVaccinate, nextVaccinate = :nextVaccinate WHERE id = :id",{
            id,
            lastVaccinate,
            nextVaccinate
        });
    }
}