const Joi = require("joi");
const mongoose = require("mongoose");
userSchema = new mongoose.Schema({
    login:{
        type:String,
        required:true,
        unique:true,
        maxlength:30,
        minlength:4
    },
    password:{
        type:String,
        required:true,
        minlength:4,
        maxlength:1024
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:255
    },
    imgUrl:{
        type:String,
        default:'/public/img/default-profile-umage.jpg'
    },
    isAdmin:{
        type:Boolean, 
        default:false
    },
    // role:{type:String, default:['client']},
    created_at:{type:Date,default:Date.now },
    updated_at:{type:Date, default:Date.now}
});

function validateUser(user){
    const schema = Joi.object(
        {
            login:Joi.string().alphanum().required().min(4).max(30),
            password:Joi.string().required().min(4).max(1024),
            email:Joi.string().required().min(5).max(255).email({minDomainSegments:2})
            // .with('username')
            // .with('password', 'repeat_password')
            ,
            repeat_password:Joi.ref('password'),
            imgUrl:Joi.string(),
            isAdmin:Joi.boolean(),
            created_at:Joi.date(),
            updated_at:Joi.date()
        }
    );
        return schema.validate(user);
}

const User = mongoose.model("User", userSchema);
exports.User = User;
exports.validator = validateUser;