import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    order: {
        type: String,
        required: true,
    },
    remito: {
        type: Number,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    stock: Number,
    initialStock: Number
});

const itemModel = model('items', itemSchema);

export default itemModel;