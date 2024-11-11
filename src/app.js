import express from "express";
import session from 'express-session';
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectMemoryStore from 'memorystore';
import initializePassport from './config/passport.config.js';
import viewsRouter from "./routes/views.router.js";
import itemRouter from "./routes/items.router.js";
import userRouter from "./routes/users.router.js";
import environment from './config/environment.config.js';
import changesRouter from "./routes/changes.router.js";
import purchaseRouter from "./routes/purchase.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

//Handlebars
const hbs = handlebars.create({ helpers: { add: (a, b) => a + b, subtract: (a, b) => a - b, gt: (a, b) => a > b, lt: (a, b) => a < b, } });
app.engine('handlebars', hbs.engine);
app.set('views', 'views/');
app.set('view engine', 'handlebars');

//MemoryStore
const MemoryStore = connectMemoryStore(session);
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
    secret: environment.KEY,
    resave: true,
    saveUninitialized: true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(environment.KEY));

//Routers
app.use('/', viewsRouter);
app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);
app.use('/api/changes', changesRouter);
app.use('/api/purchases', purchaseRouter);

app.listen(3000, () => {
    console.log('Escuchando puerto 3000');
});
mongoose.connect(environment.DB_LINK)
    .then(() => {
        console.log('DB connected');
    }).catch((error) => {
        console.log('Ocurrió un error', error);
    });