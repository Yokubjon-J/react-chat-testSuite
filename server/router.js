const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("another (???) server is up & running");
});

module.exports = router;