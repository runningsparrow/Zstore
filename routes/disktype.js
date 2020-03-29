var express = require('express');
var router = express.Router();
const disktype = require('../model/disktype');

/* GET users listing. */
router.get('/', function(req, res, next) {
    disktype.findAll(
        ).then(function(result){
            console.log(result)
            res.send(result)
        })
});

module.exports = router;