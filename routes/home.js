const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res)=>{
    const json = {
            name:"Mansur", 
            surname:"Jo'rayev",
            age:21
    }
    res.send(JSON.stringify(json));
    
});

module.exports = router;