const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0', 
      info: {
        title: 'API de Activos', 
        description: 'Documentación de la API de Activos', 
        version: '1.0.0', 
      },
    },
    apis: [
            './src/modules/*/controllers.js'
        ], 
  };
  
  module.exports = swaggerOptions;