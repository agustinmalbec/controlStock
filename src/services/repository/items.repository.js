//import ItemDTO from "../dto/items.dto.js";

export default class ItemRepository {
    constructor(dao) {
        this.service = dao;
    }

    async getItems(page, limit) {
        return await this.service.getItems(page, limit);
    }

    async addItem(item) {
        //const newItem = new ItemDTO(Item);
        return await this.service.addItem(item);
    }

    async searchItems(item, page, limit) {
        return await this.service.searchItems(item, page, limit);
    }

    async getItemById(id) {
        return await this.service.getItemById(id);
    }

    async getItemByTitle(title) {
        return await this.service.getItemByTitle({ title });
    }

    async getItemBySupplier(supplier) {
        return await this.service.getItemBySupplier({ supplier });
    }

    async updateItem(id, item) {
        return await this.service.updateItem(id, item);
    }

    async deleteItem(id) {
        return await this.service.deleteItem(id);
    }
}