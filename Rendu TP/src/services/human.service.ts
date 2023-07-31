// Import module
import { Human } from '../models/human'
import {animalService} from "./animal.service";

export class humanService {
    // Create a human
    async createHuman(data: any) {
        try {
            return await Human.create(data)
        } catch (error) {
            console.log(error);
        }
    }

    // Get all Humans
    async getHumans() {
        try {
            return await Human.find({}).populate("animal")
        } catch (error) {
            console.log(error)
        }
    }

    // Get a single human
    async getHuman(id: string) {

        try {
            const human = await Human.findById({_id:id})
            if (!human) {
                return null
            }
            return human

        } catch (error) {
            console.log(error)
        }
    }

    //update a human
    async updateHuman(id: string, data: any) {
        try {
            //pass the id of the object you want to update
            //data is for the new body you are updating the old one with
            //new:true, so the dats being returned, is the update one
            const human = await Human.findByIdAndUpdate({_id:id}, data, {new: true})
            if(!human){
                return null
            }
            return human
        } catch (error) {
            console.log(error)
        }
    }

    //delete a human by using the find by id and delete
    async deleteHuman(id: string) {
        try {
            const human = await Human.findByIdAndDelete(id)
            if (!human) {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
}

//export the class
export const humanServices = new humanService()