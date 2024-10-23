import ChangesDTO from "../dto/changes.dto.js";

export default class ChangesRepository {
    constructor(dao) {
        this.service = dao;
    };

    async getChanges() {
        return await this.service.getChanges();
    }

    async addChange(user, description, change) {
        const newChange = new ChangesDTO(user, description, change)
        return await this.service.addChange(newChange);
    }

    async getByUser(user) {
        return await this.service.getByUser(user);
    }

    async getByItem(itemCode) {
        return await this.service.getByItem(itemCode);
    }

    async update(itemCode, update) {
        return await this.service.update(itemCode, update);
    }
};