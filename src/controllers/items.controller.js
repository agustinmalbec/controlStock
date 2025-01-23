import itemModel from "../services/models/items.model.js";
import { itemService } from "../services/service.js";
import changesController from "./changes.controller.js";
import purchaseController from "./purchase.controller.js";

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

    async getItemsByOrder(order) {
        try {
            return await this.controller.getItemsByOrder(order);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async searchItems(item, page, limit) {
        try {
            const { order, place, remito, supplier, title, type } = item;
            const search = {};
            if (order) search.order = order;
            if (place) search.place = place;
            if (remito) search.remito = remito;
            if (supplier) search.supplier = supplier;
            if (title) search.title = { $regex: title, $options: 'i' };
            if (type) {
                if (type == '');
                if (type == 'order') search.isInitial = true;
                if (type == 'remito') search.isInitial = false;
            };
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

    async getItem(order, title, supplier) {
        try {
            return await this.controller.getItem(order, title, supplier);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }


    async getInitialItem(order) {
        try {
            return await this.controller.getInitialItem(order);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getSingleInitialItem(order, title, supplier) {
        try {
            return await this.controller.getSingleInitialItem(order, title, supplier);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getStockItem(order) {
        try {
            return await this.controller.getStockItem(order);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async addItem(item, user) {
        try {

            const description = `${user.first_name} agrego ${item.title}`;
            const find = await this.controller.getItem(item.order, item.title, item.supplier);
            if (find.length == 0) {
                item.actualStock = item.initialStock;
                item.isInitial = true;
            }
            if (find.length > 0) {
                for (const element of find) {
                    if (item.title == element.title && item.remito == element.remito) {
                        return null;
                    }
                }
                item.actualStock = find[0].actualStock - item.stock;
                for (const element of find) {
                    element.actualStock = item.actualStock;
                    await this.controller.updateItem(element._id, element);
                }
            }

            const added = await this.controller.addItem(item);
            await changesController.addChange(user, description, added);
            await this.controlStock(item.order);
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

    async controlStock(order) {
        try {
            const items = await this.controller.getInitialItem(order);
            let count = 0;
            for (const element of items) {
                if (element.actualStock == 0) {
                    count++;
                }
            }
            if (count == items.length) {
                return true;
            }
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async deleteItem(id) {
        try {
            const item = await this.controller.getItemById(id);
            const find = await this.controller.getItem(item.order, item.title, item.supplier);
            find[0].actualStock = find[0].actualStock + item.stock;
            await this.controller.updateItem(find[0]._id, find[0]);
            return await this.controller.deleteItem(id);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }
}

const itemController = new ItemController();
export default itemController;