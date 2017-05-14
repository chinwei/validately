var edit = new Vue({
  el: '#edit',
  data: {
    survey: {
      surveyID: "survey1",
      writeup: {},
      questions: [
      { 
        questionID: "question1",
        label: 'Would this idea have helped you plan your trips more easily? how?', 
      },
      { 
        questionID: "question2",
        label: '456 What do you think is the hardest part about planning a trip?', 
      },
      { 
        questionID: "question3",
        label: 'Another question to test', 
      },
    ],
  },
  },
  methods: {
    handleSubmit: function(){

      this.survey.writeup = $("#editor .ql-editor").html();

      firebase.database().ref('survey/').set({
       surveyID: "survey1",
       writeup: this.survey.writeup,
       questions: this.survey.questions,
       timestamp: new Date()
      });


      // firebase.database().ref('survey/').push({
      //   UID: this.submission.UID,
      //   answers: this.submission.answers,
      //   surveyID: this.submission.surveyID,
      //   timestamp: new Date()
      // });
      // this.submitted = true;
    }
  }
})