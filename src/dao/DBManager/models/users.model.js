import mongoose from 'mongoose';
import { accessRolesEnum } from '../../../config/enums.js';

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: accessRolesEnum.USER,
    },
    cart: {
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cart'
        }
    },
    documents: [{
        type: String,
        reference: String
    }],
    last_connection: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

usersSchema.methods.updateLastConnection = function() {
    this.last_connection = new Date();
    return this.save();
};


const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;
