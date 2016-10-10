import {Mongo} from 'meteor/mongo';

const Recrs = new Mongo.Collection('recrs');

Meteor.methods({
  'addRecr': function(recr) {
    let id  = Recrs.insert(recr);
    return id;
  },


})


export default Recrs;
