// Import module
import { Animal } from '../models/animal'
import {Human} from "../models/human";

export class animalService {
    // Create a animal
    async createAnimal(data: any) {
        try {
            return await Animal.create(data)
        } catch (error) {
            console.log(error);
        }
    }

    // Get all Animals
    async getAnimals() {
        try {
            return await Animal.find({})
        } catch (error) {
            console.log(error)
        }
    }

    // Get a single animal
    async getAnimal(id: string) {

        try {
            const animal = await Animal.findById({_id:id})
            if (!animal) {
                return null
            }
            return animal

        } catch (error) {
            console.log(error)
        }
    }

    //update a animal
    async updateAnimal(id: string, data: any) {
        try {
            //pass the id of the object you want to update
            //data is for the new body you are updating the old one with
            //new:true, so the dats being returned, is the update one
            const animal = await Animal.findByIdAndUpdate({_id:id}, data, {new: true})
            if(!animal){
                return null
            }
            return animal
        } catch (error) {
            console.log(error)
        }
    }

    //delete a animal by using the find by id and delete
    async deleteAnimal(id: string) {
        try {
            const animal = await Animal.findById(id)
            if (!animal) {
                return null
            }

            const animalToDelete = await Animal.findByIdAndDelete({_id:id});
            return animal;
        } catch (error) {
            console.log(error)
        }
    }

    async setAllAnimalsIsDomesticToFalse(): Promise<void> {
        try {
            await Animal.updateMany({}, { isDomestic: false }).exec();
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour des animaux.');
        }
    }
}

//export the class
export const animalServices = new animalService()