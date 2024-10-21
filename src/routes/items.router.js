import { Router } from "express";
import itemController from "../controllers/items.controller.js";
import changesController from "../controllers/changes.controller.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import userController from "../controllers/users.controller.js";

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

itemRouter.post('/', upload.single('voucher'), async (req, res) => {
    try {
        const item = req.body;
        const file = req.file;
        item.voucher = []
        const path = file.path.replace('public\\', '');
        file.path = path;
        item.voucher.push(file);
        await itemController.addItem(item);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.post('/:code', middlewarePassportJWT, async (req, res) => {
    try {
        const user = req.user;
        const code = req.params.code;
        const { stock } = req.body;
        const item = await itemController.getItemByCode(code);
        const oldStock = item.stock;
        item.stock = stock;
        const description = `Se cambio el stock de ${oldStock} a ${stock}`;
        await changesController.addChange(user.first_name, description, item)
        await itemController.updateItem(code, item);
        res.redirect('back');
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.post('/delete/:code', async (req, res) => {
    try {
        const code = req.params.code;
        await itemController.deleteItem(code);
        res.redirect('back');
    } catch (error) {
        res.status(500).send(error);
    }
});

export default itemRouter;