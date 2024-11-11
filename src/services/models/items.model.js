import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    order: String,
    remito: Number,
    supplier: String,
    title: String,
    description: String,
    stock: Number,
    initialStock: Number
});

const itemModel = model('items', itemSchema);

export default itemModel;