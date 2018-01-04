/**
 * Created by USER on 1/1/2018.
 */
var express=require('express');
var router=express.Router();
var model=require("./../models/vizData")

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addData',function (req,res,next) {
console.log("<<<<<<<<<<<<");

var info =new model(req.body.addData);
console.log(info);

    info.save(function (err,data) {
        if(err){
            throw (err)
        }
    if(!err){

            res.status(200).json({success:true,data:data})
    }
    })
    
})
router.get('/getdata',function (req,res,next) {
    model.find({},function(err,data){
        if(err){
            throw(err)
        }
if(!err) {
    res.status(200).json({succcess: true, data: data})
    console.log(data)
}
        })

})
module.exports=router;
