/**
 * Created by USER on 1/1/2018.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var vizSchema = new Schema({

    "Age":{"type":Number},
    "Gender":{"type":String},
    "Leisure":{"type":Number},
    "Sleep":{"type":Number},
    "PersonalCare":{"type":Number},
    "Household":{"type":Number},
    "Study":{"type":Number},
    "ProfessionalHour":{"type":Number},
    "Internet":{"type":Number},
    "Sports":{"type":Number},
    "DailyTravel":{"type":Number}

});

module.exports=mongoose.model('viz',vizSchema);
