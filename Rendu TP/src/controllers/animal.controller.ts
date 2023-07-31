//import modules
import {animalServices} from '../services/animal.service'
import { Request, Response } from 'express'
import { AnimalsSchemaValidate } from '../models/animal'

class animalController {
    // Add animal controller
    addAnimal = async (req: Request, res: Response) => {
        try {
            //data to be saved in database
            const data = {
                name: req.body.name,
                age: req.body.age,
                isDomestic: req.body.isDomestic,
            }
            //validating the request
            const {error, value} = AnimalsSchemaValidate.validate(data)

            if(error){
                return res.status(400).send(error.message);
            }else{
                //call the create animal function in the service and pass the data from the request
                const animal = await animalServices.createAnimal(value)
                res.status(201).send(animal)
            }
        }
        catch (error) {
            console.error('Error while adding animal:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    //get all animals
    getAnimals = async (req: Request, res: Response) => {
        try {
            const animals = await animalServices.getAnimals()
            res.send(animals)
        } catch (error) {
            console.error('Error while fetching animals:', error);
            return res.status(500).send('Internal Server Error');
        }
    }


    //get a single animal
    getOneAnimal = async (req: Request, res: Response) => {
        try {
            //get id from the parameter
            const id = req.params.id
            const animal = await animalServices.getAnimal(id)
            if (!animal) {
                return res.status(404).send('Animal not found');
            }
            res.send(animal)
        } catch (error) {
            console.error('Error while fetching a single animal:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    //update animal
    updateAnimal = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const animal = await animalServices.updateAnimal(id, req.body)
            if (!animal) {
                return res.status(404).send('Animal not found');
            }
            res.send(animal)
        } catch (error) {
            console.error('Error while updating animal:', error);
            return res.status(500).send('Internal Server Error');
        }
    }


    // Delete a animal
    deleteAnimal = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const animal = await animalServices.deleteAnimal(id);
            if (!animal) {
                return res.status(404).send('Animal not found');
            }
            return res.send('Animal deleted');
        } catch (error) {
            console.error('Error while deleting animal:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
}

//export class
export const AnimalController = new animalController()