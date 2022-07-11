import { Router } from "express";
import {PetRecord} from "../records/pet.record";

export const petRouter = Router()
    .get('/search/:searchValue?', async (req,res) => {

        const pets = await PetRecord.findAllPets(req.params.searchValue ?? '');

        res.json(pets);
    })
    .get('/:id',async (req,res)=>{
        const pet = await PetRecord.getOnePet(req.params.id);
        res.json(pet);
    })
    .post('/', async (req,res)=>{
        const pet = new PetRecord(req.body);
        await pet.insert();
        res.json(pet);
    })
    .delete('/:id', async (req,res)=>{
        await PetRecord.delete(req.params.id);
        res.json(req.params.id);
    })
    .patch('/:id/:lastVaccinate/:nextVaccinate', async (req,res)=>{
        await PetRecord.update(req.params.id,req.params.lastVaccinate,req.params.nextVaccinate);
        res.json(req.params.id);
    })

