import { Router } from "express";
import itemController from "../controllers/items.controller.js";
import userController from "../controllers/users.controller.js";
import changesController from "../controllers/changes.controller.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import { isAdmin, isAuth, isSupervisor } from "../middleware/auth.middleware.js";
import purchaseController from "../controllers/purchase.controller.js";

const viewsRouter = Router();

/* viewsRouter.get('/', middlewarePassportJWT, isAuth, isSupervisor, async (req, res) => {
    try {
        res.render('carga', {
            title: 'Cargar'
        });
    } catch (error) {
        res.status(500).send(error);
    }
}); */

viewsRouter.get('/buscar', middlewarePassportJWT, isAuth, async (req, res) => {
    const { page = 1, order, place, remito, supplier, title, type } = req.query;
    const item = { order, place, remito, supplier, title, type };
    const limit = 10;
    try {
        const { data, totalPages, currentPage } = await itemController.searchItems(item, page, limit);
        const cp = Number(currentPage);
        res.render('buscar', {
            title: 'Buscar',
            data,
            page: cp,
            totalPages,
            order,
            place,
            remito,
            supplier,
            title,
            type
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

viewsRouter.get('/', middlewarePassportJWT, isAdmin, async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const limit = 20;
        const { data, totalPages, currentPage } = await purchaseController.getOpenPurchases(page, limit);
        const cp = Number(currentPage);
        for (const element of data) {
            if (element.items[0]) {
                element.supplier = element.items[0].supplier;
            } else {
                element.supplier = '';
            }
        }

        res.render('resultados', {
            title: 'Resultados',
            orders: data,
            page: cp,
            totalPages
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/ordenes-cerradas', middlewarePassportJWT, isAdmin, async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const limit = 20;
        const { data, totalPages, currentPage } = await purchaseController.getDonePurchases(page, limit);
        const cp = Number(currentPage);
        for (const element of data) {
            if (element.items[0]) {
                element.supplier = element.items[0].supplier;
            } else {
                element.supplier = '';
            }
        }

        res.render('ordenesCerradas', {
            title: 'Ordenes cerradas',
            orders: data,
            page: cp,
            totalPages
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/imprimir-ordenes', middlewarePassportJWT, isAdmin, async (req, res) => {
    try {
        const initialOrders = await purchaseController.getInitialPurchases();

        res.render('imprimirOrdenes', {
            title: 'Imprimir ordenes',
            initialOrders
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/carga-inicial/:id', middlewarePassportJWT, isAdmin, async (req, res) => {
    try {
        const order = await purchaseController.getPurchaseById(req.params.id);
        //const item = req.body;
        //item.order = order.order;
        const initialOrder = await itemController.getInitialItem(order.order);
        res.render('cargaInicial', {
            title: 'Carga inicial',
            order: order.order,
            orderId: req.params.id,
            initialOrder
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/carga-remito/:id', middlewarePassportJWT, isAdmin, async (req, res) => {
    try {
        const order = await purchaseController.getPurchaseById(req.params.id);
        const item = req.body;
        item.order = order.order;
        const supplierAux = order.items.map(supplier => ({ supplier: supplier.supplier }));
        const suppliers = [...new Set(supplierAux.map(JSON.stringify))].map(JSON.parse);
        const materialrAux = order.items.map(material => ({ title: material.title }));
        const material = [...new Set(materialrAux.map(JSON.stringify))].map(JSON.parse);

        res.render('carga', {
            title: 'Cargar remito',
            order: order.order,
            place: order.place,
            suppliers,
            material,
            orderId: req.params.id
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/materiales-orden/:id', middlewarePassportJWT, isAdmin, async (req, res) => {
    try {
        const order = await purchaseController.getPurchaseById(req.params.id);
        const itemsOrder = await itemController.getStockItem(order.order);
        const initialOrder = await itemController.getInitialItem(order.order);

        const item = req.body;
        item.order = order.order;
        res.render('materialesOrden', {
            title: 'Materiales',
            nOrder: order.order,
            place: order.place,
            order: itemsOrder,
            initialOrder,
            _id: req.params.id
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