/**
 * Created by USER on 1/1/2018.
 */

/**
 * Created by USER on 1/1/2018.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema = new Schema({

    "Age":{"type":Number},
    "Gender":{"type":String},
    "Index":{"type":Number}

});

module.exports=mongoose.model('user',userSchema);

