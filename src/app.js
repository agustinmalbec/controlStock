import express from "express";
import handlebars from "express-handlebars";
import mongoose from 'mongoose';

import viewsRouter from "./routes/views.router.js";
import itemRouter from "./routes/items.router.js";
import environment from './config/environment.config.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/items', itemRouter)

app.listen(3000, () => {
    console.log('Escuchando puerto 8080');
});
mongoose.connect(environment.DB_LINK)
    .then(() => {
        console.log('DB connected');
    }).catch((error) => {
        console.log('Ocurrió un error', error);
    });