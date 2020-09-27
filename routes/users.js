const express = require('express');
const router = express.Router();
const {User, validator} = require("../models/User.model");
const _ = require("lodash");
const auth = require("../middleware/auth");
router.use(express.json());

//Get query /users:GET
router.get('/',auth, async (req, res)=>{
    const users =await User.find()
    .sort({login:1, isAdmin:1}); 
    res.send(users);
});

//for POST query /users:POST data:{login:req.body.login,
        // password:examplepassword,
        // email:exampleemail,
        // imgUrl:exampleimgUrl,
        // isAdmin:false
    //      password_repeat:password
//                  }

router.post('/', async (req, res)=>{
    // console.log(req.body);
    // req.body must login, password, repeat_password, email, imgUrl, 
    const {error} = validator(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    let user =await User.findOne({email:req.body.email});
    if(user)
        return res.status(400).send("Bu email avval ro'yxatdan o'tgan");
    user =await User.findOne({login:req.body.login});
    if(user)
        return res.status(400).send("Bu login avval ro'yxatdan o'tgan");
    user  = new User({
        login:req.body.login,
        password:req.body.password,
        email:req.body.email,
        imgUrl:req.body.imgUrl,
        isAdmin:false
    });
    
    await user.save();
    console.log("Foydalanuvchi qo'shildi");
    return res.send(_.pick(user, ['_id','login', 'email', 'imgUrl', 'isAdmin' ]));
});

//for delete method /users/id
router.delete('/:id',async(req, res)=>{
    if(!(await User.findOne({_id:{$eq:req.params.id}})))
        return res.status(404).send("User topilmadi");

    const user  = await User.findByIdAndDelete(req.params.id);
        return res.send(user);
});

//for PUT query /users/id :PUT data:{
    //      login:req.body.login,
        // password:examplepassword,
        // email:exampleemail,
        // imgUrl:exampleimgUrl,
        // isAdmin:false
    //      password_repeat:password
//                  }

router.put('/:id',  async(req, res)=>{
    const {error} = validator(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    let userDB2 = await User.findOne({_id:{$ne:req.params.id}, login:{$eq:req.body.login} });
    let userDB1 = await User.findOne({_id:{$ne:req.params.id}, email:{$eq:req.body.email} });
    if(userDB2)
        return res.send('Bunday login mavjud');
    if(userDB1)
        return res.send('Bunday email mavjud');
    let user = await User.findByIdAndUpdate({_id:req.params.id}, {
        login:req.body.login,
        password:req.body.password,
        email:req.body.email,
        imgUrl:req.body.imgUrl,
        isAdmin:false,
        updated_at:Date.now()
    });
    if(user)
        return res.send(_.pick(user, ['_id','login', 'email', 'imgUrl', 'isAdmin' ]));
        return res.send('Foydalanuvchini yangilab bo\'lmadi');
});



module.exports = router;