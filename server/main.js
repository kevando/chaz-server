import { Meteor } from 'meteor/meteor';
import publications from './publications';

Meteor.startup(() => {
  publications();
});
