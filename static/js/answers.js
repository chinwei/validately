var database = firebase.database();

var answersDB = firebase.database().ref('answers/');
answersDB.on('value', function(snapshot) {
  answers.list = snapshot.val()
  
  console.log(answers.list)
  
  var list = _.map(answers.list, function(num, key){ 
    // console.log(num);
   return num;
  });
  
  console.log(list);
  


  var groupedData = _.groupBy(answers.list, function(d){
    return d.questions[0].label;
  }); 
  answers.list = groupedData;
  // console.log(groupedData);
//   [
//     
//       {
//         "abc": "1",
//         "def": "4"    
//       },
//       {
//         "abc": "2",
//         "def": "5"    
//       },
//       {
//         "abc": "3",
//         "def": "6"    
//       }
//    
//   ]
  
 // {
 //   "abc": ["1","2","3"],
 //    "def": ["4", "5", "6"]
 // }
  
});


var answers = new Vue({
  el: '#answers',
  data: {
    list: {},
    groupedList: {}

  },

})



