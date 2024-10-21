import passport from "passport";
import passportLocal from "passport-local";
import jwtStrategy from 'passport-jwt';
import userController from "../controllers/users.controller.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import environment from "./environment.config.js";
import { ObjectId } from "mongodb";
//import { logger } from '../middleware/logger.middleware.js';

const localStrategy = passportLocal.Strategy;
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'dni' },
        async (req, username, password, done) => {
            const { first_name, last_name, dni } = req.body;
            try {
                const exist = await userController.getUserByDNI(dni);
                if (exist) {
                    //logger.error('El operario ya existe');
                    done(null, false);
                }
                const user = {
                    first_name,
                    last_name,
                    dni,
                    password: createHash(password)
                }
                const result = await userController.createUser(user);
                return done(null, result);
            } catch (error) {
                return done('Error de registro' + error);
            }
        }
    ));

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'dni' },
        async (req, username, password, done) => {
            const { dni } = req.body;
            try {
                let user = {};
                if (dni === environment.ADMIN_USERNAME) {
                    user.role = 'admin';
                    user.password = environment.ADMIN_PASSWORD;
                    user._id = new ObjectId('111111111111111111111111');
                    if (user.password !== password) throw new Error('Contraseña incorrecta');
                } else {
                    user = await userController.getUserByDNI(dni);
                    user.last_connection = new Date();
                    await userController.updateUser(dni, user)
                }
                if (!user) {
                    //logger.error('No existe el usuario');
                    return done(null, false);
                }

                if (!isValidPassword(user, password) && dni !== environment.ADMIN_USERNAME) {
                    //logger.error('Credenciales invalidas');
                    return done(null, false);
                }

                return done(null, user);
            } catch (error) {
                return done('Error de login' + error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userController.getUserById(id);
            done(null, user);
        } catch (error) {
            logger.error('Error al deserializar usuario' + error);
        }
    });

    passport.use('current', new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: environment.SECRET_KEY
        }, async (jwt_payload, done) => {
            try {
                delete jwt_payload.user.password;
                return done(null, jwt_payload.user)
            } catch (error) {
                return done(error)
            }
        }
    ));
}

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwtCookieToken'];
    }
    return token;
};

export default initializePassport;