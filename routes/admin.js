const express = require('express');
const router = express.Router();
const path = require('path');
router.use(express.json());

router.get('*', (req, res)=>{
return res.sendFile(path.join(__dirname+"../../../public_html/index.html"));
});

module.exports = router;