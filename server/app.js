Meteor.startup(function() {
  // if (Posts.find().count() === 0) {
  //   for (i = 1; i <= 10; i++) {
  //     Posts.insert({title: 'Post ' + Random.id()});
  //   }
  // }
});

// Meteor.publish('posts', function() {
//   return Posts.find();
// });

// on the server
Meteor.publish('recs', function() {
    return Recs.find();
      // return Posts.find({flagged: false});
});
Meteor.publish('recrs', function() {
    return Recs.find();
});


Meteor.publish('init', function() {

    return [
      Recs.find(),
      Recrs.find()
    ];
});
