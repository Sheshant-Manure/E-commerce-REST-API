const express  = require('express');
const app = express();
require('./database/MongoDB');

require('dotenv').config();
const port = process.env.PORT;

app.get('/', (req, res)=>{
    res.send('Ecommerce REST API');
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})
