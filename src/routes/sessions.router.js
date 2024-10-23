import { Router } from "express";

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

export default sessionsRouter;