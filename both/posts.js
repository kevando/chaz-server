Posts = new Mongo.Collection('posts');


Meteor.methods({
  'addPost': function(post) {

    Posts.insert(post);
  },

  'deletePost': function() {
    let post = Posts.findOne();
    if (post) {
      Posts.remove({_id: post._id});
    }
  },


})
