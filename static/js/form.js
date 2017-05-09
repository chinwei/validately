// Get a reference to the database service
var database = firebase.database();

// firebase.database().ref('survey/').set({
// 	surveyID: "survey1",
// 	questions: [
// 		{ 
// 			questionID: "question1",
// 			label: 'Would this idea have helped you plan your trips more easily? how?', 
// 		},
// 		{ 
// 			questionID: "question2",
// 			label: 'What do you think is the hardest part about planning a trip?', 
// 		},
// 		{ 
// 			questionID: "question3",
// 			label: 'Another question to test', 
// 		},
// 	],
// 	timestamp: new Date()
// });


var form = new Vue({
  el: '#form',
  created: function() {
  	for (i=0; i<this.survey.questions.length; i++) {
  		this.submission.answers.push({
  			questionID: this.survey.questions[i].questionID,
  			input: ""
  		});
  	}
  },
  data: {
    submitted: false,
    survey: {
    	surveyID: "survey1",
	    questions: [
			{ 
				questionID: "question1",
				label: 'Would this idea have helped you plan your trips more easily? how?', 
			},
			{ 
				questionID: "question2",
				label: 'What do you think is the hardest part about planning a trip?', 
			},
			{ 
				questionID: "question3",
				label: 'Another question to test', 
			},
		],
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