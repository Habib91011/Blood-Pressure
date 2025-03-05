//הגדרת Swagger API
// npm install express mysql2 body-parser swagger-jsdoc swagger-ui-express
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Blood Pressure Tracker API',
            description: 'API for managing blood pressure measurements',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:6183'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(6183, () => {
    console.log('Server is running on port 6183');
});
