Recs = new Mongo.Collection('recs');


Meteor.methods({
  'addRec': function(rec) {
    Recs.insert(rec);
  },

  'updateRec': function(rec) {
    Recs.update(rec._id,{$set:rec})
  },

  'deleteRec': function(rec) {
    Recs.remove(rec._id);
  },


})
