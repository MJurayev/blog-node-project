const express = require('express');
const router = express.Router();
const {User, validator} = require("../models/User.model");
const _ = require("lodash");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt")
router.use(express.json());
// const cors = require('cors');

//Get query /users:GET
router.get('/', auth, async (req, res)=>{
    const users =await User.find()
    .sort({login:1, isAdmin:1}); 
    return res.status(200).json(users);
});

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
    user = new User(_.pick(req.body, ['login', 'email', 'password', 'isAdmin', 'imgUrl']));
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  console.log("Foydalanuvchi qo'shildi");
  res.send(_.pick(user, ['_id', 'login', 'email', 'isAdmin']));

});

//for delete method /users/id
router.delete('/:id',auth, async(req, res)=>{
    if(!(await User.findOne({_id:{$eq:req.params.id}})))
        return res.status(404).send("User topilmadi");

    const user  = await User.findByIdAndDelete(req.params.id);
        return res.send(user);
});

router.put('/:id', auth, async(req, res)=>{
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
    }, {new :true});
    if(user)
         res.send(_.pick(user, ['_id','login', 'email', 'imgUrl', 'isAdmin' ]));
        return res.send('Foydalanuvchini yangilab bo\'lmadi');
});


router.get('/:id',auth, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send('Yaroqsiz id');
  
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send('Berilgan IDga teng bo\'lgan foydalanuvchi topilmadi');
  
    res.send(user);
  });
module.exports = router;