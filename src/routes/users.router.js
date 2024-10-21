import { Router } from "express";
import userController from "../controllers/users.controller.js";
import { createHash } from "../utils/utils.js";
import passport from "passport";
import { generateToken } from "../middleware/jwt.middleware.js";
//import { upload } from "../middleware/multer.middleware.js";

const userRouter = Router();

userRouter.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    try {
        res.redirect('/login');
    } catch (error) {
        //req.logger.error('No se pudo registrar');
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
        //req.logger.error('No se pudo iniciar sesión');
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

let alertData = {
    showAlert: false,
    title: '',
    icon: ''
};
userRouter.post('/role/:dni', async (req, res) => {
    try {

        const userDNI = req.params.dni
        const user = await userController.getUserByDNI(userDNI);
        if (user.role === 'operario con permisos') {
            user.role = 'operario'
            await userController.updateUser(userDNI, user);
            alertData = {
                showAlert: true,
                title: 'Se cambio el rol a operario',
                icon: 'success'
            };
            return res.redirect('back');
        }
        user.role = 'operario con permisos';
        alertData = {
            showAlert: true,
            title: 'Se cambio el rol a operario con permisos',
            icon: 'success'
        };

        await userController.updateUser(userDNI, user);
        return res.redirect('back');
    } catch (error) {
        res.status(500).send(error);
    }
});
export { alertData }

userRouter.post('/:udni', async (req, res) => {
    try {
        const udni = req.params.udni;
        await userController.deleteUser(udni);
        res.redirect('back');
    } catch (error) {
        res.status(500).send(error);
    }
});

export default userRouter;