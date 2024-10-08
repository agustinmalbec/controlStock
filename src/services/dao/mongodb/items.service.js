import itemModel from '../../models/items.model.js'

export default class itemService {
    constructor() {
        this.model = itemModel;
    }

    async getItems() {
        return await this.model.find().lean();
    }

    async addItem(item) {
        return await this.model.create(item);
    }

    async searchItems(item) {
        return await this.model.find(item).lean();
    }

    async getItemByCode(itemCode) {
        return await this.model.findOne({ code: itemCode });
    }

    async updateItem(code, item) {
        return await this.model.updateOne({ code: code }, item);
    }

    async deleteItem(id) {
        return await this.model.deleteOne({ _id: id });
    }
}