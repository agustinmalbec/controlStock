import { Router } from "express";
import passport from "passport";
import { generateToken, middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import UserDTO from "../services/dto/users.dto.js";

const sessionsRouter = Router();

sessionsRouter.get('/logout', (req, res) => {
    try {
        req.session.destroy(error => {
            if (error) {
                res.json({ error: 'Logout error', msg: 'Error al cerrar sesión' });
            }
            res.send('Sesión cerrada correctamente');
        });
    } catch (error) {
        req.logger.error(`No se finalizo la sesión`);
        res.status(500).send(error);
    }
});

sessionsRouter.get('/current', middlewarePassportJWT, async (req, res) => {
    const { user } = req.user;
    console.log('user');

    res.status(200).send({ message: 'Sesión actual: ', user });
});

export default sessionsRouter;