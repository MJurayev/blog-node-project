//packages
const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/MData', {useNewUrlParser:true, useUnifiedTopology:true})
    .then(
        console.log('mongodb ga ulanish hosil qilindi....')
    )
    .catch((e)=>{
            console.log('MongoDbga ulanishda xato:', e);
        });

mongoose.set('useFindAndModify',false);
//modules
const usersRoute = require("./routes/users");
const homeRoute = require("./routes/home");
//const authRoute = require("./routes/auth");
// const auth = require("./middleware/auth");
//middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
// app.use(auth);

//routes
app.use("/api", homeRoute);
app.use("/api/users", usersRoute);
// app.use("/auth", authRoute);

const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Server ${port} portda ishlayapti....`);
});