require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logs/vd-logs.log', level: 'error' }));
//     winston.add(new winston.transports.MongoDB({ db: 'mongodb+srv://deleted:21admin06@interpreter.0kfkg.mongodb.net/Mdata?retryWrites=true&w=majority', level: 'info' , 'useUnifiedTopology': true}));
    winston.exceptions.handle(new winston.transports.Console(), new winston.transports.File({ filename: 'logs/vd-logs.log' }))
    process.on('unhandledRejection', ex => {
        throw ex;
    });

}
