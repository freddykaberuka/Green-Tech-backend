import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

export function setupSwagger(app: express.Express) {
  const swaggerFilePath = path.join(__dirname, './config/swagger.yaml');
  const swaggerDocument = YAML.load(swaggerFilePath);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

