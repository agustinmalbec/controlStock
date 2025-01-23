import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    order: String,
    place: String,
    remito: Number,
    supplier: String,
    title: String,
    description: String,
    stock: Number,
    actualStock: Number,
    initialStock: Number,
    isInitial: {
        type: Boolean,
        default: false
    }
});

const itemModel = model('items', itemSchema);

export default itemModel;