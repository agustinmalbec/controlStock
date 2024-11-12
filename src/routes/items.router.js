import { Router } from "express";
import itemController from "../controllers/items.controller.js";
import changesController from "../controllers/changes.controller.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import initialize from '../utils/firebase.js';
import purchaseController from "../controllers/purchase.controller.js";

initialize;
const storage = getStorage();

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
        order.items.push(item);
        await purchaseController.updatePurchase(order._id, order);
        res.redirect('/');
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

itemRouter.post('/update/:id', upload.single('voucher'), middlewarePassportJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const file = req.file;
        const { supplier, title, description, category } = req.body;
        const item = await itemController.getItemById(id);

        if (supplier) { item.supplier = supplier; }
        if (title) { item.title = title; }
        if (description) { item.description = description; }
        if (category) { item.category = category; }
        if (file) {
            const storageRef = ref(storage, `facturas/${req.file.originalname}`);
            const metadata = {
                contentType: req.file.mimetype,
            };
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            file.path = downloadURL;
            item.voucher.push(file);
        }
        await itemController.updateItem(id, item);
        res.redirect('/elementos');
    } catch (error) {
        res.status(500).send(error);
    }
});

itemRouter.post('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await itemController.deleteItem(id);
        res.redirect('/elementos');
    } catch (error) {
        res.status(500).send(error);
    }
});

export default itemRouter;