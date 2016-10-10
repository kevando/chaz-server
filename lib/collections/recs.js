import {Mongo} from 'meteor/mongo';

const Recs = new Mongo.Collection('recs');

Meteor.methods({

  'addRec': function(rec) {
    let id  = Recs.insert(rec);
    return id;
  },

  'updateRec': function(rec) {
    Recs.update(rec._id,{$set:rec})
  },

  'deleteRec': function(rec) {
    Recs.remove(rec._id);
  },

})


export default Recs;
