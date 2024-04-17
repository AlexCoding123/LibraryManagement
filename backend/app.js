const express = require('express');
const cors = require('cors');
const app = express();

const catalogsRoutes = require('./routes/catalogs_routes');
const usersRoutes = require('./routes/users_routes');
const customerRoutes = require('./routes/customers_routes');

app.use(cors());

app.use(express.json());

app.use('/api/', catalogsRoutes);
app.use('/users/', usersRoutes);
app.use('/api/', customerRoutes);

app.use((req, res) => {
  res.status(404).json({Error:'Page not found'});
});

module.exports = app;
