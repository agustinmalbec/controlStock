import changesModel from "../../models/changes.model.js";

export default class changesService {
    constructor() {
        this.model = changesModel;
    }

    async getChanges() {
        return await this.model.find().lean();
    }

    async addChange(change) {
        return await this.model.create(change);
    }

    async getByUser(user) {
        return await this.model.findOne(user);
    }

    async getByItem(code) {
        return await this.model.findOne({ itemCode: code });
    }

    async update(code, update) {
        return await this.model.findOneAndUpdate({ itemCode: code }, update);
    }
};