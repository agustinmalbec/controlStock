import itemModel from '../../models/items.model.js';

export default class itemService {
    constructor() {
        this.model = itemModel;
    }

    async getItems(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const data = await this.model.find().skip(skip).limit(limit).lean();
        const totalPosts = await this.model.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
        return {
            data,
            totalPages,
            currentPage: page,
        };
    }

    async addItem(item) {
        return await this.model.create(item);
    }

    async searchItems(item, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const data = await this.model.find(item).skip(skip).limit(limit).lean();
        const totalPosts = await this.model.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
        return {
            data,
            totalPages,
            currentPage: page,
        };
    }

    async getItemById(id) {
        return await this.model.findById({ _id: id });
    }

    async getItemByTitle(title) {
        return await this.model.findOne(title);
    }

    async getItem(order, title, supplier) {
        return await this.model.find({ order: order, title: title, supplier: supplier });
    }

    async getInitialItem(order) {
        return await this.model.find({ order: order, isInitial: true }).lean();
    }

    async getSingleInitialItem(order, title, supplier) {
        return await this.model.findOne({ order: order, title: title, supplier: supplier, isInitial: true });
    }

    async getStockItem(order) {
        return await this.model.find({ order: order, isInitial: false }).lean();
    }

    async updateItem(id, item) {
        return await this.model.findByIdAndUpdate({ _id: id }, item);
    }

    async deleteItem(id) {
        return await this.model.findByIdAndDelete({ _id: id });
    }
}