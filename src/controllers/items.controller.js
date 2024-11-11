import { itemService } from "../services/service.js";
import changesController from "./changes.controller.js";

class ItemController {
    constructor() {
        this.controller = itemService;
    }

    async getItems(page, limit) {
        try {
            return await this.controller.getItems(page, limit);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async searchItems(item, page, limit) {
        try {
            const { supplier, title, description, category } = item;
            const search = {};
            if (supplier) search.supplier = supplier;
            if (title) search.title = title;
            if (description) search.description = description;
            if (category) search.category = category;

            return await this.controller.searchItems(search, page, limit);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getItemById(id) {
        try {
            return await this.controller.getItemById(id);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getItemByTitle(title) {
        try {
            return await this.controller.getItemByTitle(title);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getItemBySupplier(supplier) {
        try {
            return await this.controller.getItemBySupplier(supplier);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }


    async addItem(item, user) {
        try {
            const description = `${user.first_name} agrego ${item.title}`;
            const added = await this.controller.addItem(item);
            await changesController.addChange(user, description, added);
            return added;
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async updateItem(id, update) {
        try {
            return await this.controller.updateItem(id, update);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async deleteItem(id) {
        try {
            return await this.controller.deleteItem(id);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }
}

const itemController = new ItemController();
export default itemController;