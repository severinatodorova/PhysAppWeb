import mongoose from 'mongoose';
import { stringify } from 'querystring';

const Schema = mongoose.Schema;

export let Excercise = new Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    imgURI:{
        type:String,
    },
    liked:{
        type:Boolean,
    }
    
});
 export default mongoose.model('Excercise', Excercise); // first parameter is the name of the model and 2nd is the name of the Schema used for the model creation.
