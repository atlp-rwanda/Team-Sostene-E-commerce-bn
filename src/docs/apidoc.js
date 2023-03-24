const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Library',
      version: 1.0,
      description: 'Swagger Api Documentation',
    },
  },
  servers: [
    {
      url: process.env.SWAGGER_URL // Port Number on this URL must match Server Port Number
    },
    {
      url: 'http://localhost:3000/',
      description: 'Api server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },

  apis: [
    './src/routes/index.js',
    './src/config/swagger.js',
    './src/routes/user.route.js',
    './src/docs/user.docs.js',
  ],
};

export default options;
