//importing modules
import  {Schema, model,} from 'mongoose'
import Joi from 'joi'

//validation schema
export const HumansSchemaValidate = Joi.object({
    name: Joi.string().required().max(5),
    age: Joi.number().required(),
    city: Joi.string(),
    birthDate: Joi.date(),
    isWorking: Joi.boolean().required(),
})

//creating an interface
interface IHumans {
    name: string,
    age: number,
    city: string,
    birthDate: Date,
    isWorking: boolean,
}

//Human schema
const humanSchema = new Schema<IHumans>({
    name: {
        type: String,
        required: true,
        maxlength: 5
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    isWorking: {
        type: Boolean,
        required: true,
        default: false
    },
})

//creating a models
export const Human = model<IHumans>('Human', humanSchema )