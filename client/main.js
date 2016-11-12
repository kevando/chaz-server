import { Meteor } from 'meteor/meteor';
import { Recs } from '/lib/collections';
import { USERS_ROUTE, CREATE_USER_ROUTE } from '/config';

/*
  Notes:
  Meteor  automagically finds template file in /client by template name
*/

// ---------------------------------------------------------------------------

// ROUTER CONFIGURATION

Router.configure({
    loadingTemplate: "loading",
    notFoundTemplate: "404"
});

// ---------------------------------------------------------------------------

// HOME ROUTER

Router.route('/', function () {

  this.render('Home', {data: {title: 'My Title'}});
});

// ---------------------------------------------------------------------------

// USERS ROUTE

Router.route(USERS_ROUTE, function () {

  Meteor.subscribe('users-all');
  Meteor.subscribe('recs-all');
  var users = Meteor.users.find({});
  var recs = Recs.find({});

  var displayUsers = [];

  users.forEach(function(user) {

    var recs = Recs.find({uid: user._id}).fetch();
    var userObject = {
      uid: user._id,
      username: user.username || 'no username',
      recs: formatRecs(recs),
    }
    displayUsers.push(userObject);
  });

  this.render('Users', {data: {users: displayUsers}});
});

// ---------------------------------------------------------------------------

// CREATE NEW USER ROUTE

Router.route(CREATE_USER_ROUTE, function () {

  Meteor.subscribe('users-all');
  var users = Meteor.users.find({}).fetch();

  this.render('Register', {data: {users: users}});
});

// ---------------------------------------------------------------------------

// HANDLE NEW USER ACTION

Template.Register.events({
  'submit .new-user'({target}) {

    event.preventDefault();

    const username = target.username.value;
    target.reset();

    // Simple Validation
    if(!username || username == ''){
      alert('Invalid Username');
      return;
    }

    Accounts.createUser({
      username: username,
      password : username,
    }, function(err){
      var response = err || 'User successfully created';
      alert(response);

    });
  } // submit event
});

// ---------------------------------------------------------------------------

// ADD DATA TO REC LIST

function formatRecs(recs) {
  return recs.map(function(rec,i){
    // Create value that is the time between rec saves
    // Skip the last item because there is nothing to compare it to
    if(i < recs.length-1){
      var prevTime = moment(recs[i+1].createdAt);
      var recTime = moment(rec.createdAt);
      rec.timeBetween = prevTime.from(recTime,true);
    }
    return rec;
  });
}

// ---------------------------------------------------------------------------

// TEMPLATE HELPERS

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM/DD hh:mm a');
});

Template.registerHelper('timeAgo', function(date) {
  return moment(date).fromNow();
});
