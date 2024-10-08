import { changesService } from "../services/service.js";

class ChangesController {
    constructor() {
        this.controller = changesService;
    }

    async getChanges() {
        try {
            return await this.controller.getChanges();
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

    async getByItem(itemCode) {
        try {
            return await this.controller.getByItem(itemCode);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }
}

const changesController = new ChangesController();
export default changesController;