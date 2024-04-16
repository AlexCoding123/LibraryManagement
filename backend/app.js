const express = require('express');
const app = express();

const catalogsRoutes = require('./routes/catalogs_routes');

app.use(express.json());

app.use('/api/', catalogsRoutes);

app.use((req, res) => {
  res.status(404).json({Error:'Page not found'});
});

module.exports = app;
