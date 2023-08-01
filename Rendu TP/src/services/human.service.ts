// Import module
import {Human, IHumans} from '../models/human'
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
            return await Human.find({}).populate("animals")
        } catch (error) {
            console.log(error)
        }
    }

    // Get a single human
    async getHuman(id: string) {

        try {
            const human = await Human.findById({_id:id}).populate("animals")
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
            const human = await Human.findById({_id:id})
            if (!human) {
                return null
            }
            const humanToDelete = await Human.findByIdAndDelete({_id:id});
            return human;
        } catch (error) {
            console.log(error)
        }
    }

    async getHumansWithHighSalaryAndYoungAge(): Promise<IHumans[]> {
        return Human.find({
            salary: { $gt: 3000 },
            age: { $lt: 20 },
        }).populate('animals');
    }

    /**
     * Récupère les humains qui ont des salaires inférieurs à 1000
     * ET Qui ont plus de 40 ans
     * ET Qui habite à Paris
     * ET un animal qui fais exactement 2 fois moins l'age de l'humain
     */
    async getHumansMatchingCriteria(): Promise<IHumans[]> {
        try {
            const humans: IHumans[] = await Human.aggregate([
                {
                    $match: {
                        $and: [
                            { salary: { $lte: 1000 } },
                            { age: { $gte: 40 } },
                            { city: "Paris" },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'animals',
                        localField: 'animals',
                        foreignField: '_id',
                        as: 'animalDetails',
                    },
                },
                {
                    $addFields: {
                        animalDetails: {
                            $filter: {
                                input: '$animalDetails',
                                as: 'animal',
                                cond: {
                                    $eq: ['$age', { $divide: ['$age', 2] }],
                                },
                            },
                        },
                    },
                },
            ]).exec();

            return humans.filter((human) => human.animals.length > 0);
        } catch (error) {
            throw new Error('Erreur lors de la récupération des humains correspondant aux critères spécifiés.');
        }
    }

    async removeAllAnimalsFromAllHumans(): Promise<void> {
        try {
            await Human.updateMany({}, { $set: { animals: [] } }).exec();
        } catch (error) {
            throw new Error('Erreur lors de la suppression de tous les animaux de tous les humains.');
        }
    }

}

//export the class
export const humanServices = new humanService()