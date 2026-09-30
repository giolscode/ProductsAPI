const express = require('express');
const productRoutes = require('./routes/productRoute');
require('dotenv').config();

const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/auth', require('./routes/authRoute'));

// Routes
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port (localhost:${PORT})`);
});