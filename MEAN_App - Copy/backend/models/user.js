import mongoose from 'mongoose';
import { stringify } from 'querystring';
import {Excercise} from './excercise';

const Schema = mongoose.Schema;

let User = new Schema({
    name:{
        type:String,
    },
    cpr:{
        type:String,
    },
    diagnose:{
        type:String,
    },
    condition:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    excercises:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "Excercise"
    },
    progress : [{
        rating : Number,
        date : { type : Date, default: Date.now }
         }]
});
 export default mongoose.model('User', User); // first parameter is the name of the model and 2nd is the name of the Schema used for the model creation.

//We need to add the list of the selected exercises maybe later, we will see !