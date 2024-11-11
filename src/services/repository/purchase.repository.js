export default class PurchaseRepository {
    constructor(dao) {
        this.service = dao;
    }

    async getPurchases(page, limit) {
        return await this.service.getPurchases(page, limit);
    }

    async addPurchase(purchase) {
        return await this.service.addPurchase(purchase);
    }

    async searchPurchase(purchase, page, limit) {
        return await this.service.searchPurchase(purchase, page, limit);
    }

    async getPurchaseById(id) {
        return await this.service.getPurchaseById(id);
    }

    async getPurchaseByOrder(order) {
        return await this.service.getPurchaseByOrder(order);
    }

    async updatePurchase(id, purchase) {
        return await this.service.updatePurchase(id, purchase);
    }

    async deletePurchase(id) {
        return await this.service.deletePurchase(id);
    }
}