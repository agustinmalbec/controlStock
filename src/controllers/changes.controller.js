import { changesService } from "../services/service.js";

class ChangesController {
    constructor() {
        this.controller = changesService;
    }

    async getChanges(page, limit) {
        try {
            return await this.controller.getChanges(page, limit);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async addChange(user, description, change) {
        try {
            return await this.controller.addChange(user, description, change);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getByUser(user) {
        try {
            return await this.controller.getByUser(user);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getByItem(id) {
        try {
            return await this.controller.getByItem(id);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getById(id) {
        try {
            return await this.controller.getById(id);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async update(id, update) {
        try {
            return await this.controller.update(id, update);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }
}

const changesController = new ChangesController();
export default changesController;