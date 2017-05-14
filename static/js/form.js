// Get a reference to the database service
var database = firebase.database();




var form = new Vue({
  el: '#form',
  
  created: function(){

    var _this = this;
    var surveyDB = firebase.database().ref('survey/');
 
    surveyDB.on('value', function(snapshot) {

      var temp = {}
      


      _this.survey = snapshot.val();
      console.log(_this.survey);

      for (i=0; i<_this.survey.questions.length; i++) {
        _this.submission.answers.push({
          questionID: _this.survey.questions[i].questionID,
          input: ""
        });
      }
      


    });


  },
  data: {
    submitted: false,
    survey: {
    },
    submission: {
        surveyID: "survey1",
		UID: "user1",
		answers: [],
	    timestamp: new Date()
      }
  },
  methods: {
    handleSubmit: function(){
      firebase.database().ref('submissions/').push({
        UID: this.submission.UID,
        answers: this.submission.answers,
        surveyID: this.submission.surveyID,
        timestamp: new Date()
      });
      this.submitted = true;
    }
  }
})