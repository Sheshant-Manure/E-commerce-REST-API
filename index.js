const express  = require('express');
const app = express();
require('./database/MongoDB');

require('dotenv').config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
const productRoutes = require('./routes/productRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use('/products', productRoutes);
app.use('/search', searchRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})
