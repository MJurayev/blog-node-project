const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Posts, validatorPost} = require("../models/Post.model");
const _ = require("lodash");
const auth = require("../middleware/auth");
router.use(express.json());

router.get('/', async (req, res)=>{
    const postlar =await Posts.find()
    .sort({updated_at:1});   
   return res.send(postlar);
});

router.post('/', auth, async (req, res)=>{
    // console.log(req.body);
    // req.body must login, password, repeat_password, email, imgUrl, 
    const {error} = validatorPost(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    const post  = new Posts(_.pick(req.body, ["added_user_id", "post_title", "post_text", "imgUrl"]));
    
    await post.save();
    console.log("Post qo'shildi");
 res.send(post);
});

// //for delete method /users/id
router.delete('/:id',auth, async(req, res)=>{
    if(!(await Posts.findOne({_id:{$eq:req.params.id}})))
        return res.status(404).send("Post topilmadi topilmadi");

    const post  = await Posts.findByIdAndDelete(req.params.id);
        return res.send(post);
});

//for PUT query /users/id :PUT data:{
    //      login:req.body.login,
        // password:examplepassword,
        // email:exampleemail,
        // imgUrl:exampleimgUrl,
        // isAdmin:false
    //      password_repeat:password
//                  }

router.put('/:id', auth, async (req, res)=>{
    const {error} = validatorPost(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    const post = await Posts.findByIdAndUpdate({_id:req.params.id}, {
        post_title:req.body.post_title,
        post_text:req.body.post_text,
        imgUrl:req.body.imgUrl,
        updated_at:Date.now()
    },  {new :true});
    if(post)
        return res.send(_.pick(post, ['_id','added_user_id', 'post_title', 'post_text','imgUrl', 'created_at', 'updated_at' ]));
    res.send('Bu postni yangilab bo\'lmadi');
});


router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send('Yaroqsiz id');
  
    let post = await Posts.findById(req.params.id);
    if (!post)
      return res.status(404).send('Berilgan IDga teng bo\'lgan post topilmadi');
  
    return res.send(post);
  });

module.exports = router;