import { Router } from "express";
import itemController from "../controllers/items.controller.js";
import changesController from "../controllers/changes.controller.js";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    try {
        const data = await itemController.getItems();

        res.render('stock', {
            title: 'Items',
            data: data
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/search', async (req, res) => {
    try {
        const item = req.query;
        const items = await itemController.searchItems(item);
        res.render('search', {
            title: 'Buscar',
            items
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/changes', async (req, res) => {
    try {
        const data = await changesController.getChanges();

        res.render('changes', {
            title: 'Cambios',
            data: data
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default viewsRouter;