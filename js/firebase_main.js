 $(document).ready(function(){
  var URL = 'https://chariyrank.firebaseio.com/Charity';
 var myCharityDataRef = new Firebase(URL);
      var categories = retrieveValues(myCharityDataRef,"Category");
      var matchedCategories = [];
     // var charietyKids = myCharityDataRef;
      $('#categoryInput').keypress(function (e) {
        if (e.keyCode == 13) {
         var category = $('#categoryInput').val();
          matchedCategories = [];
        myCharityDataRef.orderByChild("Category").equalTo(category).on("child_added", function(matchesnap){
         //if there is a result
         var fld = matchesnap.val();
         matchedCategories.push(matchesnap.key());
          //displayCharieties(fld["Title"], fld["Subcategory"]);
            $('#categoryInput').val('');
          });


        $("#options").css('visibility','visible');
        $('html, body').animate({
          scrollTop: $("#options").offset().top
        }, 2000);
        
        // randomCharity = getRandomItems(matchedCategories,2);
        // firstRef = new Firebase(URL+"/"+randomCharity[0]);
        // secondRef = new Firebase(URL+"/"+randomCharity[1]);



        // var elements = matches.val();
        // console.log("Displaying things in matches...");
        // console.log("Length of matches: "+ matches.length;
         
         //console.log ("Length of matches is "+ matchedCategories.length);
        // console.log (matches[10]);
         //console.log (matches[3]);
        // console.log("Finished displaying things in matches!");
       }
     });
      /* myCharityDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayCharieties(message.name,message.text);
      });*/
       // Auto complete
    // https://gist.github.com/jharding/9458744#file-the-basics-js
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substrRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push({ value: str });
          }
        });
        cb(matches);
      };
    };
    $('#categoryInput').typeahead({
      highlight: true,
      minLength: 1
    },{
      name: "name",
      source: substringMatcher(retrieveValues(myCharityDataRef, "Category"))
    }).on('typeahead:selected', function(event, data){
      $('#cat-id').val(data);        
    });
 });


function displayCharieties(name,info){
  console.log("Displaying fields "+name + " and " + info);
  $('<div/>').text(name).prepend($('<em/>').text(info+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

//Retrieving the values for the specified key from the to level
function retrieveValues(myCharityDataRef, key){
  var keyValues = [];
   myCharityDataRef.on("child_added", function(snapchild){
  if (keyValues.indexOf(snapchild.val()[key]) == -1) {
    keyValues.push(snapchild.val()[key]);
  }
});
  return keyValues;
};

function getRandomItems(matchedCategories,n){
    var randomItems = [];
    while(randomItems.length < n){
      var item = Math.floor((Math.random() * matchedCategories.length));
      if(randomItems.length > 0 && randomItems.indexOf(matchedCategories[item]) == -1){
        randomItems.push(matchedCategories[item]);
      }
    }
    return randomItems;
}