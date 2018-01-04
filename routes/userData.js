var express = require('express');
var router = express.Router();
var model=require("./../models/userData")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/finaldata',function (req,res,next) {
  console.log("<<<<<<<<<<<")
    console.log(req.body.finaldata)
  var info=new model(req.body.finaldata);

    console.log(info);
    info.save(function (err,data) {
      if(err){
        throw (err)
      }
        else{
          res.status(200).json({succcess: true, data: data})
          console.log(data)
      }
    })
})

module.exports = router;
