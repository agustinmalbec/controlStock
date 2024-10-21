import { Router } from "express";
import itemController from "../controllers/items.controller.js";
import userController from "../controllers/users.controller.js";
import changesController from "../controllers/changes.controller.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import { isAdmin, isAuth } from "../middleware/auth.middleware.js";

const viewsRouter = Router();

viewsRouter.get('/', middlewarePassportJWT, isAuth, async (req, res) => {
    try {
        const user = req.user;
        const data = await itemController.getItems();

        res.render('stock', {
            title: 'Items',
            data: data,
            user
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/buscar', middlewarePassportJWT, isAuth, async (req, res) => {
    try {
        const item = req.query;
        const items = await itemController.searchItems(item);
        res.render('buscar', {
            title: 'Buscar',
            items
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/cambios', middlewarePassportJWT, isAuth, async (req, res) => {
    try {
        const data = await changesController.getChanges();

        res.render('cambios', {
            title: 'Cambios',
            data: data
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/registro', async (req, res) => {
    try {
        res.render('registro', { title: 'Registra tu usuario' });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/login', async (req, res) => {
    try {
        res.render('login', { title: 'Inicia sesión' });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/operarios', middlewarePassportJWT, isAdmin, async (req, res) => {
    try {
        const users = await userController.getUsers();
        res.render('operarios', { title: 'Administrador', users });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/elementos', middlewarePassportJWT, isAdmin, async (req, res) => {
    try {
        const items = await itemController.getItems();
        res.render('elementos', { title: 'Administrador', items });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default viewsRouter;