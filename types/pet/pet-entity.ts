import {FieldPacket} from "mysql2";

export interface NewPetEntity extends Omit<PetEntity, 'id'>{
    id?: string;
}

export type PetRecordResults = [PetEntity[],FieldPacket[]];

export interface PetEntity {
    id: string;
    petName: string;
    petType: string;
    petAge: number;
    ownerName: string;
    ownerPhone: number;
    lastVaccinate: Date;
    nextVaccinate: Date;
}
