var database = firebase.database();




var answers = new Vue({
  el: '#answers',
  created: function(){
    var _this = this;

    var answersDB = firebase.database().ref('submissions/');
    var surveyDB = firebase.database().ref('survey/');
    surveyDB.once('value', function(snapshot) {
      answers.survey = snapshot.val()
    })

    answersDB.on('value', function(snapshot) {
      _this.list = snapshot.val()
    });
  },
  computed: {
    groupedList: function(){
      // alert ("haha")
      var temp = {}
      var listVal = this.list;
      console.log(listVal);

      
      var list = _.map(listVal, function(num, key){ 
             return num;
            });
      console.log(list)
      // console.log(typeof list.answers)
      if (list.length > 0) {
        _.each(list[0].answers, function(n){
          var grouped = _(list).groupBy(function() {
              return n.questionID;
            })
          Object.assign(temp, grouped);
          console.log("temp")
        
        })  
      }
      return temp
    },
  },
  data: {
    test: "",
    list: {},
    survey: {},

  },

})



