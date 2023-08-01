//import modules
import {humanServices} from '../services/human.service'
import { Request, Response } from 'express'
import { HumansSchemaValidate } from '../models/human'
import {animalServices} from "../services/animal.service";

class humanController {
    // Add human controller
    addHuman = async (req: Request, res: Response) => {
        try {
            //data to be saved in database
            const data = {
                name: req.body.name,
                age: req.body.age,
                city: req.body.city,
                birthDate: req.body.birthDate,
                isWorking: req.body.isWorking,
                salary: req.body.salary,
                animals: req.body.animals
            }
            //validating the request
            const {error, value} = HumansSchemaValidate.validate(data)

            if(error){
                return res.status(400).send(error.message);
            } else {
                if (data.animals) {
                    // On vérifie que tout les animaux renseignés existe
                    for (const animalId of data.animals) {
                        const animal = await animalServices.getAnimal(animalId);
                        if (!animal) {
                            return res.status(404).send("L'animal avec l'id : " + animalId + " n'a pas été trouvé. Impossible d'ajouter l'humain.");
                        } else {
                            // On rend l'animal domestic
                            await animalServices.updateAnimal(animalId, {"isDomestic": true})
                        }
                    }
                }

                //call the create human function in the service and pass the data from the request
                const human = await humanServices.createHuman(value)
                return res.status(201).send(human)
            }
        }
        catch (error) {
            console.error('Error while adding human:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    //get all humans
    getHumans = async (req: Request, res: Response) => {
        try {
            const humans = await humanServices.getHumans()
            return res.status(200).send(humans)
        } catch (error) {
            console.error('Error while fetching humans:', error);
            return res.status(500).send('Internal Server Error');
        }
    }


    //get a single human
    getOneHuman = async (req: Request, res: Response) => {
        try {
            //get id from the parameter
            const id = req.params.id
            const human = await humanServices.getHuman(id)
            if (!human) {
                return res.status(404).send('Human not found');
            }
            return res.status(200).send(human)
        } catch (error) {
            console.error('Error while fetching a single human:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    //update human
    updateHuman = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const human = await humanServices.updateHuman(id, req.body)
            if (!human) {
                return res.status(404).send('Human not found');
            }
            return res.status(200).send(human)
        } catch (error) {
            console.error('Error while updating human:', error);
            return res.status(500).send('Internal Server Error');
        }
    }


    // Delete a human
    deleteHuman = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const human = await humanServices.deleteHuman(id);
            if (!human) {
                return res.status(404).send('Human not found');
            }
            return res.status(200).send('Human deleted');
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    }

    getHumansWithHighSalaryAndYoungAge = async (req: Request, res: Response) => {
        try {
            const humans = await humanServices.getHumansWithHighSalaryAndYoungAge();
            if (!humans) {
                return res.status(404).send("Humans not found");
            }
            return res.status(200).send(humans);
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Récupère les humains qui ont des salaires inférieurs à 1000
     * ET Qui ont plus de 40 ans
     * ET Qui habite à Paris
     * ET un animal qui fais exactement 2 fois moins l'age de l'humain
     */
    async getHumansSpecificCriteria(req: Request, res: Response){
        try {
            const humans = await humanServices.getHumansMatchingCriteria();
            return res.status(200).send(humans)
        } catch (error) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des humains correspondant aux critères spécifiés.' });
        }
    }
}

//export class
export const HumanController = new humanController()