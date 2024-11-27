import { purchaseService } from "../services/service.js";
import itemController from "./items.controller.js";

class PurchaseController {
    constructor() {
        this.controller = purchaseService;
    }

    async getPurchases(page, limit) {
        try {
            return await this.controller.getPurchases(page, limit);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async searchPurchase(purchase, page, limit) {
        try {
            const { supplier, title, description, category } = purchase;
            const search = {};
            if (supplier) search.supplier = supplier;
            if (title) search.title = title;
            if (description) search.description = description;
            if (category) search.category = category;

            return await this.controller.searchPurchase(search, page, limit);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getPurchaseById(id) {
        try {
            return await this.controller.getPurchaseById(id);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getPurchaseByOrder(order) {
        try {
            return await this.controller.getPurchaseByOrder(order);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async addPurchase(purchase) {
        try {
            return await this.controller.addPurchase(purchase);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async updatePurchase(id, update) {
        try {
            return await this.controller.updatePurchase(id, update);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async deletePurchase(id) {
        try {
            const order = await this.controller.getPurchaseById(id);
            const items = await itemController.getItemsByOrder(order.order);
            if (items.length > 0) {
                for (const element of items) {
                    await itemController.deleteItem(element._id);
                }
            }
            return await this.controller.deletePurchase(id);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }
}
const purchaseController = new PurchaseController();
export default purchaseController;