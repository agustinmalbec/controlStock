import { Schema, model } from "mongoose";

const changesSchema = new Schema({
    user: String,
    date: String,
    supplier: String,
    itemName: String,
    itemId: String,
    itemCategory: String,
    description: String,
    notes: {
        type: Array,
        default: []
    },
});

const changesModel = model('changes', changesSchema);

export default changesModel;