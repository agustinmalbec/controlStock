import { Router } from "express";
import itemController from "../controllers/items.controller.js";
import userController from "../controllers/users.controller.js";
import changesController from "../controllers/changes.controller.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import { isAdmin, isAuth, isSupervisor } from "../middleware/auth.middleware.js";
import purchaseController from "../controllers/purchase.controller.js";

const viewsRouter = Router();

viewsRouter.get('/', middlewarePassportJWT, isAuth, isSupervisor, async (req, res) => {
    try {
        res.render('carga', {
            title: 'Cargar'
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/buscar', middlewarePassportJWT, isAuth, async (req, res) => {
    const { page = 1, supplier, title, category } = req.query;
    const item = { supplier, title, category };
    const limit = 10;
    try {
        const { data, totalPages, currentPage } = await itemController.searchItems(item, page, limit);
        const cp = Number(currentPage);
        res.render('buscar', {
            title: 'Buscar',
            data,
            page: cp,
            totalPages,
            supplier,
            title,
            category
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/cambios', middlewarePassportJWT, isAuth, async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const limit = 10;
        const { data, totalPages, currentPage } = await changesController.getChanges(page, limit);
        const user = req.user;
        const cp = Number(currentPage);

        res.render('cambios', {
            title: 'Cambios',
            data: data,
            user,
            page: cp,
            totalPages
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/registro', middlewarePassportJWT, isAdmin, async (req, res) => {
    try {
        res.render('registro', { title: 'Registrar usuario' });
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
        const { page = 1 } = req.query;
        const limit = 10;
        const { data, totalPages, currentPage } = await itemController.getItems(page, limit);
        const cp = Number(currentPage);
        res.render('elementos', {
            title: 'Administrador',
            data,
            page: cp,
            totalPages
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/ordenes', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const limit = 10;
        const { data, totalPages, currentPage } = await purchaseController.getPurchases(page, limit);
        const cp = Number(currentPage);
        res.render('resultados', {
            title: 'Resultados', orders: data,
            page: cp,
            totalPages
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/error', async (req, res) => {
    try {
        res.render('error', { title: 'Error' });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default viewsRouter;