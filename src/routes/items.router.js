import { Router } from "express";
import itemController from "../controllers/items.controller.js";
import changesController from "../controllers/changes.controller.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import purchaseController from "../controllers/purchase.controller.js";


const itemRouter = Router();

itemRouter.get('/', async (req, res) => {
    try {
        const items = await itemController.getItems();
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.post('/search', async (req, res) => {
    try {
        const item = req.body;
        const searched = await itemController.searchItems(item);
        res.json(searched);
    } catch (error) {
        res.status(500).send(error);
    }
});


itemRouter.post('/', middlewarePassportJWT, async (req, res) => {
    try {
        const user = req.user;
        const it = req.body;
        let order = await purchaseController.getPurchaseByOrder(it.order);
        if (order === null) {
            order = await purchaseController.addPurchase({ order: it.order });
        }
        const item = await itemController.addItem(it, user);

        if (item == null) {
            const order = await purchaseController.getPurchaseByOrder(it.order);
            return res.render('errorDeCarga', { title: 'Error', orderId: order._id });
        }
        order.items.push(item);
        await purchaseController.updatePurchase(order._id, order);
        res.redirect('back');
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.post('/:id', middlewarePassportJWT, async (req, res) => {
    try {
        const user = req.user;
        const id = req.params.id;
        const { stock } = req.body;
        const item = await itemController.getItemById(id);
        const oldStock = item.stock;
        item.stock = stock;
        const description = `Se cambio el stock de ${oldStock} a ${stock}`;
        await changesController.addChange(user, description, item);
        await itemController.updateItem(id, item);
        res.redirect('/buscar');
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.post('/update/:id', middlewarePassportJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const { initialStock, remito, stock } = req.body;
        const item = await itemController.getItemById(id);
        const initialItem = await itemController.getSingleInitialItem(item.order, item.title, item.supplier);

        if (initialStock) {
            const initial = item.initialStock;
            item.initialStock = initialStock;
            if (initialStock > item.initialStock) {
                item.actualStock = item.actualStock + (initialStock - initial);
            } else {
                item.actualStock = item.actualStock - (initial - initialStock);
            }
        }
        if (remito) { item.remito = remito; }
        if (stock) {
            const oldStock = item.stock;
            item.stock = stock;
            if (stock > oldStock) {
                initialItem.actualStock = initialItem.actualStock - (stock - oldStock);
            } else {
                initialItem.actualStock = initialItem.actualStock + (oldStock - stock);
            }
            await itemController.updateItem(initialItem._id, initialItem);
        }
        await itemController.updateItem(id, item);
        res.redirect('back');
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.post('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await itemController.deleteItem(id);
        res.redirect('back');
    } catch (error) {
        res.status(500).send(error);
    }
});

export default itemRouter;