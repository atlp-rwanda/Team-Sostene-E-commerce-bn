/* eslint-disable import/no-extraneous-dependencies */
import '@babel/polyfill';
import '@babel/register';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route.js';
import options from './docs/apidoc.js';
import sequelize from './database/config/db.js';

dotenv.config();
const app = express();

app.use(morgan('tiny'));

const { PORT } = process.env;
sequelize.sync();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const specs = swaggerJSDoc(options);

sequelize.sync();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.listen(PORT);

export default app;
