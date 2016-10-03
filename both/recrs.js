Recrs = new Mongo.Collection('recrs');


Meteor.methods({
  'addRecr': function(recr) {
    Recrs.insert(recr);
  },

  // 'updateRec': function(rec) {
  //   Recs.update(rec._id,{$set:rec})
  // },
  //
  // 'deleteRec': function(rec) {
  //   Recs.remove(rec._id);
  // },


})
