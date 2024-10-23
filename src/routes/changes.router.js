import { Router } from "express";
import changesController from "../controllers/changes.controller.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";

const changesRouter = Router();

changesRouter.post('/', middlewarePassportJWT, async (req, res) => {
    try {
        const { itemCode, note } = req.body;
        const user = req.user;
        const change = await changesController.getByItem(itemCode);
        const update = { Operario: user.first_name + ' ' + user.last_name, Nota: note };
        change.notes.push(update);
        await changesController.update(itemCode, change);
        res.redirect('/cambios');
    } catch (error) {
        res.status(500).send(error);
    }
});

export default changesRouter;