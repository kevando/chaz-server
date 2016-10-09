import { Meteor } from 'meteor/meteor';
import { Recrs } from '/lib/collections';

export default () => {
  Meteor.publish('recrs-list', (userId) => {
    return Recrs.find({uid:userId});
  });
}
