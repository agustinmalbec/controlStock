//import ItemDTO from "../dto/items.dto.js";

export default class ItemRepository {
    constructor(dao) {
        this.service = dao;
    }

    async getItems() {
        return await this.service.getItems();
    }

    async addItem(item) {
        //const newItem = new ItemDTO(Item);
        return await this.service.addItem(item);
    }

    async searchItems(item) {
        return await this.service.searchItems(item);
    }

    async getItemByCode(itemCode) {
        return await this.service.getItemByCode(itemCode);
    }

    async updateItem(code, item) {
        return await this.service.updateItem(code, item);

    }

    async deleteItem(id) {
        return await this.service.deleteItem(id);
    }
}