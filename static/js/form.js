// Get a reference to the database service
var database = firebase.database();

function writeUserData(submission) {
  firebase.database().ref('submissions/').push({
    UID: submission.UID,
    answers: submission.answers,
    surveyID: submission.surveyID,
    timestamp: new Date()
  });
}


var form = new Vue({
  el: '#form',
  data: {
    submitted: false,
    questions: [
		{ 
			questionID: "question1",
			label: 'Would this idea have helped you plan your trips more easily? how?', 
		},
		{ 
			questionID: "question2",
			label: 'What do you think is the hardest part about planning a trip?', 
		},
		],
    submission: {
        surveyID: "survey1",
		UID: "user1",
		answers: [
			{ 
				questionID: "question1",
				input: '', 
			},
			{ 
				questionID: "question2",
				input: '', 
			},
	      ],
	    timestamp: new Date()

      }

  },
  methods: {
    handleSubmit: function(){
      writeUserData(this.submission);
      this.submitted = true;
    }
  }
})