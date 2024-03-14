import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from '../src/utils.js'
import { __mainDirname } from '../src/utils.js'
import { Server } from "socket.io";
import { initPassport } from './config/passport.config.js';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import UsersRouter from '../src/routes/users.router.js';
import ViewsRouter from '../src/routes/views.router.js';
import CartRouter from '../src/routes/cart.router.js';
import ProductRouter from '../src/routes/products.router.js';
import MessagesRouter from '../src/routes/messages.router.js';
import TicketRouter from './routes/tickets.router.js';
import mockingProductsRouter from './routes/mockingProducts.router.js';
import configs from './config/configs.js'
import { addLogger } from './loggers.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();

app.use(cookieParser());

const swaggerOptions = {
  definition: {
    openapi: '3.0.1', 
    info: {
      title: 'Documentacion del proyecto de e-commerce',
      description: 'API pensada para un e-commerce de productos varios'
    }
  },
  apis: [`${__mainDirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

const usersRouter = new UsersRouter();
const viewsRouter = new ViewsRouter();
const cartRouter = new CartRouter();
const productRouter = new ProductRouter();
const messagesRouter = new MessagesRouter();
const ticketsRouter = new TicketRouter();

initPassport();
app.use(passport.initialize());

app.use((req, res, next) => {
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addLogger);

const runtimeOptions = {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true,
}; 

app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine({runtimeOptions}));
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");


app.use('/', viewsRouter.getRouter());
app.use('/api/carts', cartRouter.getRouter());
app.use('/api/products', productRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/api/messages-view', messagesRouter.getRouter());
app.use('/api/mockingproducts', mockingProductsRouter)
app.use('/api/tickets', ticketsRouter.getRouter());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo falló!');
});

try {
  await mongoose.connect(configs.mongoUrl);
  console.log('La BD esta conectada')
} catch (error) {
  console.error(error.message);
};

const server = app.listen(configs.port, () => {
  console.log(`Conectado en puerto: ${configs.port}`);
});

const socketServer = new Server(server);

const messages = [];

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("message", (data) => {
    messages.push(data);
    socketServer.emit("messageLogs", messages);
  });

  socket.on("authenticated", (data) => {
    socket.emit("messageLogs", messages);
    socket.broadcast.emit('newUserConnected', data)
  });
});