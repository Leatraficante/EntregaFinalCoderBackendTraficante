import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import configs from "../../../config/configs.js";

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        default: configs.adminEmail
    },
    owner_role: {
        type: String,
        required: true
    }
});

productsSchema.plugin(mongoosePaginate); 

export const productsModel = mongoose.model(productsCollection, productsSchema);