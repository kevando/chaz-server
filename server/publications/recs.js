import { Meteor } from 'meteor/meteor';
import { Recs } from '/lib/collections';

export default () => {
  Meteor.publish('recs-list', (userId) => {
    return Recs.find({uid:userId});
  });
}
