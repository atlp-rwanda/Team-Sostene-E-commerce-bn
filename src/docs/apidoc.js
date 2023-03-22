const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Library',
      version: 1.0,
      description: 'Team Sostene API documentation',
    },
    servers: [
      {
        url: `/`,
        description: 'Api Server',
      },
    ],
  },
  apis: ['./src/docs/*'],
};

export default options;
