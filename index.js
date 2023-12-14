const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const products = require('./routes/products');
app.use('/products', products);

const users = require('./routes/users');
app.use('/users', users);

app.listen(port, () => console.log(`Server started on port ${port}`));