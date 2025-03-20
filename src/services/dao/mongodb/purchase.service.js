import purchaseModel from "../../models/purchase.model.js";

export default class purchaseService {
    constructor() {
        this.model = purchaseModel;
    }

    async getPurchases(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const data = await this.model.find().skip(skip).limit(limit).populate('items').lean();
        const totalPosts = await this.model.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
        return {
            data,
            totalPages,
            currentPage: page,
        };
    }

    async getDonePurchases(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const data = await this.model.find({ status: true }).skip(skip).limit(limit).populate('items').lean();
        const totalPosts = await this.model.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
        return {
            data,
            totalPages,
            currentPage: page,
        };
    }

    async getOpenPurchases(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const status = {
            $or: [
                { status: false },
                { status: { $exists: false } }
            ]
        };

        const data = await this.model.find(status).skip(skip).limit(limit).populate('items').lean();
        const totalPosts = await this.model.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
        return {
            data,
            totalPages,
            currentPage: page,
        };
    }

    async getAllPurchases() {
        return await this.model.find().populate('items').lean();
    }

    async addPurchase(purchase) {
        return await this.model.create(purchase);
    }

    async searchPurchase(purchase, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const data = await this.model.find(purchase).skip(skip).limit(limit).lean();
        const totalPosts = await this.model.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
        return {
            data,
            totalPages,
            currentPage: page,
        };
    }

    async getPurchaseById(id) {
        return await this.model.findById({ _id: id }).lean();
    }

    async getPurchaseByOrder(order) {
        return await this.model.findOne({ order: order });
    }

    async updatePurchase(id, purchase) {
        return await this.model.findByIdAndUpdate({ _id: id }, purchase);
    }

    async deletePurchase(id) {
        return await this.model.findByIdAndDelete({ _id: id });
    }
}