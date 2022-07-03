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