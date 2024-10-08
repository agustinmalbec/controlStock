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
        return await this.model.find(user);
    }

    async getByItem(itemCode) {
        return await this.model.find(itemCode);
    }
};