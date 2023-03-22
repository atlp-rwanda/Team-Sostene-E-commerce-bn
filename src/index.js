/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import blogRoutes from './routes/index.js';
import userRoutes from './routes/user.route.js';
import options from './docs/apidoc.js';
import redis from './helpers/redis';

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const specs = swaggerJSDoc(options);

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(specs));
app.use('', blogRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));

export default app;
