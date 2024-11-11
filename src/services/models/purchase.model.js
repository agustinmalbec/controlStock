import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
    order: {
        type: String,
        required: true,
        unique: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'items' }],
});

purchaseSchema.pre('find', function () {
    this.populate('items');
});
purchaseSchema.pre('findOne', function () {
    this.populate('items');
});

const purchaseModel = model('purchases', purchaseSchema);

export default purchaseModel;