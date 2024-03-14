import mongoose from 'mongoose';

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true
    },
    purchase_datetime: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true,
    },
    purchaser: {
        type: String,
        require: true
    }
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;