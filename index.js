const express  = require('express');
const app = express();
require('./database/MongoDB');

require('dotenv').config();
const port = process.env.PORT;
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');

app.use('/products', productRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})
