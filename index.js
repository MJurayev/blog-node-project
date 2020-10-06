
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const Handlebars = require('handlebars')
const cors = require('cors');
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const winston = require('winston');
// require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

app.use(express.static("public"));
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server ${port} portda ishlayapti....`);
});
