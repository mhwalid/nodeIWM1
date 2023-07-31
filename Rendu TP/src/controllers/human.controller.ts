//import modules
import {humanServices} from '../services/human.service'
import { Request, Response } from 'express'
import { HumansSchemaValidate } from '../models/human'

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
                animals: req.body.animals
            }
            //validating the request
            const {error, value} = HumansSchemaValidate.validate(data)

            if(error){
                return res.status(400).send(error.message);
            }else{
                //call the create human function in the service and pass the data from the request
                const human = await humanServices.createHuman(value)
                res.status(201).send(human)
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
            res.send(humans)
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
            res.send(human)
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
            res.send(human)
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
            return res.send('Human deleted');
        } catch (error) {
            console.error('Error while deleting human:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
}

//export class
export const HumanController = new humanController()