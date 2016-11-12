import { Meteor } from 'meteor/meteor';
// import { Users } from '/lib/collections';

export default () => {
  Meteor.publish('users-all', function tasksPublication() {
    return Meteor.users.find({});
  });

}
