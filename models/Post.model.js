const { number, string } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");
postsSchema = new mongoose.Schema({
    added_user_id:{
        type:String,
        required:true,
    },
    post_title:{
        type:String,
        required:true,
        minlength:4,
        maxlength:1024
    },
    post_text:{
        type:String,
        required:true,
        minlength:5
    },
    imgUrl:{
        type:String,
        default:'/public/img/default-profile-umage.jpg'
    },
    created_at:{type:Date,default:Date.now },
    updated_at:{type:Date, default:Date.now}
});

function validatePost(post){
    const schema = Joi.object(
        {
            added_user_id:Joi.string(),
            post_title:Joi.string(),
            post_text:Joi.string(),
            imgUrl:Joi.string(),
            created_at:Joi.date(),
            updated_at:Joi.date()
        }
    );
        return schema.validate(post);
}

const Posts = mongoose.model("Posts", postsSchema);
exports.Posts = Posts;
exports.validatorPost = validatePost;