import {Mongo} from 'meteor/mongo';

const Recrs = new Mongo.Collection('recrs');
const Recs = new Mongo.Collection('recs');

Meteor.methods({

  addRec: function(rec) {
    let id  = Recs.insert(rec);
    return id;
  },

  updateRec: function(rec) {
    Recs.update(rec._id,{$set:rec})
  },

  gradeRec: function(rec) {
    Recs.update(rec._id,{$set:rec});

    Meteor.call('updateScore',rec);
  },

  deleteRec: function(rec) {
    Recs.remove(rec._id);
  },

  addRecr: function(recr) {
    recr.score = {
      overall: 0,
    }
    let id  = Recrs.insert(recr);
    return id;
  },


  updateScore: function(rec){


    var recr = Recrs.findOne({_id: rec.recr_id});
    var score = recr.score;

    // Calculate Overall Score
    var recs = Recs.find({recr_id: rec.recr_id, grade: { $exists: true }}); // only recs w/ grades
    var cummulative_grade = 0;
    recs.forEach(function(rec){
      cummulative_grade +=rec.grade;
    });
    score.overall = calculateScore(cummulative_grade,recs.count());

    // Calculate Category Score
    var recs = Recs.find({recr_id: rec.recr_id, category: rec.category, grade: { $exists: true }}); // only recs w/ grades
    cummulative_grade = 0;
    recs.forEach(function(rec){
      cummulative_grade +=rec.grade;
    });
    score[rec.category] = calculateScore(cummulative_grade,recs.count());

    // Update recs and rec with new score data
    Recrs.update(rec.recr_id,{$set:{score: score}})
    Recs.update(rec._id,{$set:{recr_score:score}})

  }


});

function calculateScore(cummulative_grade,total_recs){
  console.log('cummulative grade',cummulative_grade);
  console.log('Total Recs',total_recs);
  return 100*(  cummulative_grade/(5*total_recs)  );
}


export {
  Recrs,
  Recs
};
