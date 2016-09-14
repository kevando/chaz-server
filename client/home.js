Template.home.onCreated(function() {
  this.subscribe('recs');
});

Template.home.helpers({
  count() {
    return Recs.find().count();
  }
});

Template.home.events({

  'click #hello': function(e) {
    e.preventDefault();

    // Meteor.call('deletePost');

    alert('Hello World');
  }
})
