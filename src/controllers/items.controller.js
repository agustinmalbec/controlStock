import { itemService } from "../services/service.js";

class ItemController {
    constructor() {
        this.controller = itemService;
    }

    async getItems() {
        try {
            return await this.controller.getItems();
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async searchItems(item) {
        try {
            const { code, title, description, category } = item;
            const search = {};
            if (code) search.code = code;
            if (title) search.title = title;
            if (description) search.description = description;
            if (category) search.category = category;

            return await this.controller.searchItems(search);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getItemByCode(itemCode) {
        try {
            return await this.controller.getItemByCode(itemCode);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async addItem(item) {

        /*  //try {
         const requiredFields = ['title', 'description', 'price', 'category', 'code', 'stock'];
         for (let field of requiredFields) {
             if (!item[field]) {
                 CustomError.createError({
                     name: "item Create Error",
                     cause: createItemErrorInfo({ item }),
                     message: "Error tratando de crear un item",
                     code: errorCodes.INVALID_TYPES_ERROR
                 })
             }
         } */

        /* const search = await this.controller.getItemByCode(item.code);
        if (search !== null) {
            return console.log("El campo CODE se encuentra repetido");
        } */
        return await this.controller.addItem(item);
        /* } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        } */
    }

    async updateItem(code, update) {
        try {
            return await this.controller.updateItem(code, update);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async deleteItem(itemId) {
        try {
            return await this.controller.deleteItem(itemId)
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }
}

const itemController = new ItemController();
export default itemController;