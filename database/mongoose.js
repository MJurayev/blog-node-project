const mongoose = require('mongoose');

 = mongoose.connect('mongodb://localhost:27017', { 'useNewUrlParser': true, 'useUnifiedTopology': true })
    .then(() => {
        console.log("mongo db ulandi")
    })
    .catch((err) => {
        console.log('ERRor:', err);
    });