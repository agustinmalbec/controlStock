import changesModel from "../../models/changes.model.js";

export default class changesService {
    constructor() {
        this.model = changesModel;
    }

    async getChanges(page = 1, limit = 10) {
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

    async addChange(change) {
        return await this.model.create(change);
    }

    async getByUser(user) {
        return await this.model.findOne(user);
    }

    async getByItem(id) {
        return await this.model.findOne({ itemId: id });
    }

    async getById(id) {
        return await this.model.findById({ _id: id });
    }

    async update(id, update) {
        return await this.model.findByIdAndUpdate({ _id: id }, update);
    }
};