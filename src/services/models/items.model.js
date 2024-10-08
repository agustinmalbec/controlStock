import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    code: {
        type: String,
        unique: true,
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
    thumbnails: {
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