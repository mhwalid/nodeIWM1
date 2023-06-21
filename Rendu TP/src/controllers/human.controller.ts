//import modules
import {humanServices} from '../services/human.service'
import { Request, Response } from 'express'
import { HumansSchemaValidate } from '../models/human'

class humanController {
    // Add human controller
    addHuman = async (req: Request, res: Response) => {
        //data to be saved in database
        const data = {
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            isWorking: req.body.isWorking
        }
        //validating the request
        const {error, value} = HumansSchemaValidate.validate(data)

        if(error){
            res.send(error.message)

        }else{
            //call the create human function in the service and pass the data from the request
            const human = await humanServices.createHuman(value)
            res.status(201).send(human)
        }

    }

    //get all humans
    getHumans = async (req: Request, res: Response) => {
        const humans = await humanServices.getHumans()
        res.send(humans)
    }


    //get a single human
    getOneHuman = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = req.params.id
        const human = await humanServices.getHuman(id)
        res.send(human)
    }

    //update human
    updateHuman = async (req: Request, res: Response) => {
        const id = req.params.id
        const human = await humanServices.updateHuman(id, req.body)
        res.send(human)
    }


    //delete a human
    deleteHuman = async (req: Request, res: Response) => {
        const id = req.params.id
        await humanServices.deleteHuman(id)
        res.send('human deleted')
    }

}

//export class
export const HumanController = new humanController()