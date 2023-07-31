//importing modules
import mongoose, {Schema, model,} from 'mongoose'
import { IAnimals } from "./animal";
import Joi from 'joi'

//validation schema
export const HumansSchemaValidate = Joi.object({
    name: Joi.string().required().max(5),
    age: Joi.number().required(),
    city: Joi.string(),
    birthDate: Joi.date(),
    isWorking: Joi.boolean().required(),
    animals: Joi.array()
})

//creating an interface
interface IHumans {
    name: string,
    age: number,
    city: string,
    birthDate: Date,
    isWorking: boolean,
    animals: IAnimals[]
}

//Human schema
const humanSchema = new Schema<IHumans>({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: 5
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    city: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    isWorking: {
        type: Boolean,
        required: [true, "Is Working is required"],
        default: false
    },
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "animal",
    }]
})

//creating a models
export const Human = model<IHumans>('Human', humanSchema )