import { Meteor } from 'meteor/meteor';
import { Recs } from '/lib/collections';
import { Recrs } from '/lib/collections';

export default () => {

  Meteor.publish('recs-list', function(userId) {

    var myRecs = Recs.find({uid:userId});

    // Append Recr data to each Rec object
    myRecs.forEach(function(rec){
       var recr = Recrs.findOne({_id: rec.recr_id});
       Recs.update({
         _id: rec._id
       }, {
          $set: {
             recr: recr
          }
       });
     });

    return myRecs;

});
}
