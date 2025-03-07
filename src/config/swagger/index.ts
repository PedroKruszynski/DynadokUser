import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
};

const swaggerParams = {
  swaggerDefinition,
  apis: ['./src/modules/users/infra/http/controllers/UsersController.ts'],
}

const swaggerSpecs = swaggerJsdoc(swaggerParams);

export default function setupSwagger(app: any): void {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
}
