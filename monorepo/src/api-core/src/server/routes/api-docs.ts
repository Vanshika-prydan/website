import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDocs from 'swagger-jsdoc';

const app = express.Router();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'We Clean Green AB',
    version: '1.0.0',
    contact: {
      name: 'Niklas Johansson (Niklas Johansson',
      url: 'https://cleangreen.se',
      tags: {
        name: 'customer',
      },
    },
  },

  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: 'Local development server',
    },
  ],
};
const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/server/routes/*.ts', './src/server/models/*.swagger.yaml', './src/server/controllers/**/swagger.yaml'],
};
const swaggerSpec = swaggerJSDocs(swaggerOptions);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
