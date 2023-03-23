import express from 'express';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import blogRoutes from './src/routes/index.js';

const app = express();

dotenv.config();
const { PORT } = process.env;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Library',
      version: 1.0,
      description: 'Swagger Api Documentation',
    },
    servers: [
      {
        url: process.env.SWAGGER_URL, // Port Number on this URL must be the same as the Server Port Number
      },
    ],
  },

  apis: ['./src/routes/index.js', './src/config/swagger.js'],
};
const specs = swaggerJSDoc(options);
app.use('/myapi', swaggerUi.serve, swaggerUi.setup(specs));

app.use('', blogRoutes);

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));

export default app;
