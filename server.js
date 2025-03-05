const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const usersRouter = require('./routes/users');
const measurementsRouter = require('./routes/measurements');

const app = express();
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/measurements', measurementsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => console.log('Server running on port 3000'));
