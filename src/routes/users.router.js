import { Router } from "express";
import userController from "../controllers/users.controller.js";
import { createHash } from "../utils/utils.js";
import passport from "passport";
import { generateToken } from "../middleware/jwt.middleware.js";

const userRouter = Router();

userRouter.post('/register', passport.authenticate('register', { failureRedirect: '/registro' }), async (req, res) => {
    try {
        res.redirect('/registro');
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.post('/authentication', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    const { dni, password } = req.user;
    const user = req.user;
    try {
        const token = generateToken(user);
        res.cookie('jwtCookieToken', token,
            {
                maxAge: 6000000,
                httpOnly: true
            }
        ).redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.get('/logout', async (req, res) => {
    try {
        res.clearCookie('jwtCookieToken').redirect('/login');
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.post('/role/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userController.getUserById(id);
        if (user.role === 'operario con permisos') {
            user.role = 'operario';
            await userController.updateUser(id, user);
            return res.redirect('back');
        }
        user.role = 'operario con permisos';
        await userController.updateUser(id, user);
        return res.redirect('/operarios');
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.post('/password/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { password } = req.body;
        const user = await userController.getUserById(id);
        user.password = createHash(password);
        await userController.updateUser(id, user);
        res.redirect('/operarios');
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.post('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await userController.deleteUser(id);
        res.redirect('/operarios');
    } catch (error) {
        res.status(500).send(error);
    }
});

export default userRouter;