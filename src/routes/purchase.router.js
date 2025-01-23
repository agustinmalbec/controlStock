import { Router } from "express";
import purchaseController from "../controllers/purchase.controller.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import itemController from "../controllers/items.controller.js";

const purchaseRouter = Router();

purchaseRouter.get('/', async (req, res) => {
    try {
        const purchases = await purchaseController.getPurchases();
        res.send(purchases);
    } catch (error) {
        res.status(500).send(error);
    }
});

purchaseRouter.post('/search', async (req, res) => {
    try {
        const purchase = req.body;
        const searched = await purchaseController.searchPurchase(purchase);
        res.json(searched);
    } catch (error) {
        res.status(500).send(error);
    }
});

purchaseRouter.post('/', middlewarePassportJWT, async (req, res) => {
    try {
        const purchase = req.body;
        await purchaseController.addPurchase(purchase);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

purchaseRouter.post('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user;
        const it = req.body;
        const order = await purchaseController.getPurchaseById(id);
        it.order = order.order;
        const item = await itemController.addItem(it, user);
        order.items.push(item);
        await purchaseController.updatePurchase(id, order);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

purchaseRouter.post('/updateNumber/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { order, place } = req.body;
        if (place) {
            const oldOrder = await purchaseController.getPurchaseById(id);
            const items = await itemController.getItemsByOrder(oldOrder.order);
            for (const element of items) {
                const item = await itemController.getItemById(element._id);
                item.place = place;
                await itemController.updateItem(item._id, item);
            }
            oldOrder.place = place;
            await purchaseController.updatePurchase(id, oldOrder);
        }
        if (order) {
            const oldOrder = await purchaseController.getPurchaseById(id);
            const items = await itemController.getItemsByOrder(oldOrder.order);
            for (const element of items) {
                const item = await itemController.getItemById(element._id);
                item.order = order;
                await itemController.updateItem(item._id, item);
            }
            oldOrder.order = order;
            await purchaseController.updatePurchase(id, oldOrder);
        }
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

purchaseRouter.post('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await purchaseController.deletePurchase(id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

export default purchaseRouter;