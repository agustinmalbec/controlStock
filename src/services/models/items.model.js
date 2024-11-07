import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    supplier: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    voucher: {
        type: Array,
        required: true,
        default: [],
    },
    stock: {
        type: Number,
        required: true,
    }
});

const itemModel = model('items', itemSchema);

export default itemModel;