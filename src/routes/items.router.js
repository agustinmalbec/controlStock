import { Router } from "express";
import itemController from "../controllers/items.controller.js";
import changesController from "../controllers/changes.controller.js";

const itemRouter = Router();

itemRouter.get('/', async (req, res) => {
    try {
        const items = await itemController.getItems();
        res.send(items)
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

itemRouter.post('/', async (req, res) => {
    try {
        const item = req.body;
        await itemController.addItem(item);
        res.redirect('/stock');
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.post('/:code', async (req, res) => {
    try {
        const code = req.params.code;
        const { stock, user } = req.body;
        const item = await itemController.getItemByCode(code);
        const oldStock = item.stock;
        item.stock = stock;
        const description = `Se cambio el stock de ${oldStock} a ${stock}`;
        await changesController.addChange(user, description, item)
        await itemController.updateItem(code, item);
        res.redirect('back');
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.delete('/', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error);
    }
});

export default itemRouter;