import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img:{
        type:String,
        required : true,
    },
    content:{
        type:String,
        required : true,
    },
    username:{
        type:String,
        required : true,
    },
},{timestamps:true});
export default mongoose.models.Post || model('Post', postSchema);