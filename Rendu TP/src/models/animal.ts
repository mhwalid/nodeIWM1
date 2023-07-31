//importing modules
import  {Schema, model,} from 'mongoose'
import Joi from 'joi'

//validation schema
export const AnimalsSchemaValidate = Joi.object({
    name: Joi.string().required().max(5),
    age: Joi.number().required(),
    isDomestic: Joi.string(),
})

//creating an interface
export interface IAnimals {
    name: string,
    age: number,
    isDomestic: boolean,
}

//Animal schema
const animalSchema = new Schema<IAnimals>({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: 5
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    isDomestic: {
        type: Boolean,
        required: [true, "Is Domestic is required"],
        default: false
    },
})

//creating a models
export const Animal = model<IAnimals>('Animal', animalSchema )