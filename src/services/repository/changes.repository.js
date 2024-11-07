import ChangesDTO from "../dto/changes.dto.js";

export default class ChangesRepository {
    constructor(dao) {
        this.service = dao;
    };

    async getChanges(page, limit) {
        return await this.service.getChanges(page, limit);
    }

    async addChange(user, description, change) {
        const newChange = new ChangesDTO(user, description, change);
        return await this.service.addChange(newChange);
    }

    async getByUser(user) {
        return await this.service.getByUser(user);
    }

    async getByItem(id) {
        return await this.service.getByItem(id);
    }

    async getById(id) {
        return await this.service.getById(id);
    }

    async update(id, update) {
        return await this.service.update(id, update);
    }
};