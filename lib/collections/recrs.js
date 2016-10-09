import {Mongo} from 'meteor/mongo';

const Recrs = new Mongo.Collection('recrs');

Meteor.methods({
  'addRecr': function(recr) {
    Recrs.insert(recr);
  },


})


export default Recrs;
