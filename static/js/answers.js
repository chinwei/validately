var database = firebase.database();

var answersDB = firebase.database().ref('submissions/');
var surveyDB = firebase.database().ref('survey/');
surveyDB.once('value', function(snapshot) {
  answers.survey = snapshot.val()
})


// answersDB.on('value', function(snapshot) {

//   var temp = {}
//   answers.list = snapshot.val()
//   var list = _.map(answers.list, function(num, key){ 
//    return num;
//   });
  
//   $.each(list[0].answers, function(n){
//     var grouped = _(list).groupBy(function(o) {
//           return o.answers[n].questionID;
//       })
//     temp = Object.assign(answers.groupedList, grouped);
  
//   })
//   answers.mergedList = temp;
//   console.log(answers.mergedList)
// });


var answers = new Vue({
  el: '#answers',
  created: function(){

    var _this = this;
    


    answersDB.on('value', function(snapshot) {

      var temp = {}
      _this.list = snapshot.val()

      var list = _.map(_this.list, function(num, key){ 
       return num;
      });

      $.each(list[0].answers, function(n){
        var grouped = _(list).groupBy(function(o) {
            return o.answers[n].questionID;
          })
        Object.assign(_this.groupedList, grouped);

      
      })

      
      answers.groupedList = _this.groupedList;
      // answers.groupedList = "lalala"
     // console.log(_this.groupedList);
     console.log(answers.groupedList);

    });
    

  },
  data: {
    list: {},
    groupedList: {},
    mergedList: {},
    survey: {}

  },

})



