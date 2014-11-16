 $(document).ready(function(){
  var URL = 'https://chariyrank.firebaseio.com/Charity';
 var myCharityDataRef = new Firebase(URL);

      var categories = retrieveValues(myCharityDataRef,"Category");
      var matchedCategories = [];
     // var charietyKids = myCharityDataRef;
      $('#categoryInput').keypress(function (e) {
        if (e.keyCode == 13) {

        //ranker for items
        var ranker =  {};
         var category = $('#categoryInput').val();
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
        
         var locationReg = "[A-Za-z ]*, [A-Z]{2}";

         //the bracket
         var bracket = getRandomItems(matchedCategories,8);

         randomCharity = getRandomItems(bracket,2);
         myCharityDataRef.orderByKey().equalTo(randomCharity[0]).on("child_added", function(item){
          var fld = item.val();
         
          console.log(fld);
          $("#Title1").html(fld["Title"]);
          $("#buttonTitle1").text(fld["Title"]);
          $("#Mission1").html("<b>Mission:</b> "+fld["Mission"]);
          $("#Subcategory1").html("<b>Subcategory:</b> "+fld["Subcategory"]);
          $("#Financial1").html("<b>Financial:</b> " +fld["Financial"] + "/100");
          $("#Accountability1").html("<b>Accountability & Transparency:</b> " +fld["AccountabilityTransparency"] + "/100");
          $("#ProgramExpenses1").html("<b>Program Expenses: </b>"+fld["ProgramExpenses"]);
          $("#AdminExpenses1").html("<b>Administrative Expenses: </b>"+fld["AdminExpenses"]);
          $("#Efficency1").html("<b>Fundraising Efficency: </b>"+ fld["FundraisingEfficency"]);
          $("#LeaderCompensation1").html("<b>Leader Compensation: </b>"+fld["LeaderCompensation"] + " of expenses");
          if (fld["Location"]["text"].match(locationReg) == null){
            $("#Location1").html("<b>Location: </b> N/A");
          } else {
          $("#Location1").html("<b>Location: </b>"+ fld["Location"]["text"].match(locationReg));
          }
         });

          myCharityDataRef.orderByKey().equalTo(randomCharity[1]).on("child_added", function(item){
          var fld = item.val();
          console.log(fld);
          $("#Title2").html(fld["Title"]);
          $("#buttonTitle2").text(fld["Title"]);
          $("#Mission2").html("<b>Mission:</b> "+fld["Mission"]);
          $("#Subcategory2").html("<b>Subcategory:</b> "+fld["Subcategory"]);
          $("#Financial2").html("<b>Financial:</b> " +fld["Financial"] + "/100");
          $("#Accountability2").html("<b>Accountability & Transparency:</b> " +fld["AccountabilityTransparency"] + "/100");
          $("#ProgramExpenses2").html("<b>Program Expenses: </b>"+fld["ProgramExpenses"]);
          $("#AdminExpenses2").html("<b>Administrative Expenses: </b>"+fld["AdminExpenses"]);
          $("#Efficency2").html("<b>Fundraising Efficency: </b>"+ fld["FundraisingEfficency"]);
          $("#LeaderCompensation2").html("<b>Leader Compensation: </b>"+fld["LeaderCompensation"] + " of expenses");
          if (fld["Location"]["text"].match(locationReg) == null){
            $("#Location2").html("<b>Location: </b> N/A");
          } else {
          $("#Location2").html("<b>Location: </b>"+ fld["Location"]["text"].match(locationReg));
          }


          $("button").click(function(){
            var buttonTitle = $(this).text();
            myCharityDataRef.orderByKey().equalTo(randomCharity[0]).on("child_added", function(item){
            var fld = item.val();
            if (buttonTitle == fld["Title"]){
            // charity 1 won
             var looser =  bracket.pop(randomCharity[1]);
              ranker = addToRanker(ranker, randomCharity[0]);
              if(bracket.length  > 2){             
                 ranker = removeFromRanker(ranker, looser);
            }
             winvsloss(true,randomCharity[0],loser);
            } else {
            // charity 2 one
              var looser = bracket.pop(randomCharity[0]);
              ranker = addToRanker(ranker, randomCharity[1]);
              ranker = removeFromRanker(ranker, looser);
               winvsloss(false,loser,randomCharity[1]);
            }

          });
           
           if(bracket.length > 1){
            var locationReg = "[A-Za-z ]*, [A-Z]{2}";
         randomCharity = getRandomItems(bracket,2);
         myCharityDataRef.orderByKey().equalTo(randomCharity[0]).on("child_added", function(item){
          var fld = item.val();
         
          console.log(fld);
          $("#Title1").html(fld["Title"]);
          $("#buttonTitle1").text(fld["Title"]);
          $("#Mission1").html("<b>Mission:</b> "+fld["Mission"]);
          $("#Subcategory1").html("<b>Subcategory:</b> "+fld["Subcategory"]);
          $("#Financial1").html("<b>Financial:</b> " +fld["Financial"] + "/100");
          $("#Accountability1").html("<b>Accountability & Transparency:</b> " +fld["AccountabilityTransparency"] + "/100");
          $("#ProgramExpenses1").html("<b>Program Expenses: </b>"+fld["ProgramExpenses"]);
          $("#AdminExpenses1").html("<b>Administrative Expenses: </b>"+fld["AdminExpenses"]);
          $("#Efficency1").html("<b>Fundraising Efficency: </b>"+ fld["FundraisingEfficency"]);
          $("#LeaderCompensation1").html("<b>Leader Compensation: </b>"+fld["LeaderCompensation"] + " of expenses");
          if (fld["Location"]["text"].match(locationReg) == null){
            $("#Location1").html("<b>Location: </b> N/A");
          } else {
          $("#Location1").html("<b>Location: </b>"+ fld["Location"]["text"].match(locationReg));
          }
         });

          myCharityDataRef.orderByKey().equalTo(randomCharity[1]).on("child_added", function(item){
          var fld = item.val();
          console.log(fld);
          $("#Title2").html(fld["Title"]);
          $("#buttonTitle2").text(fld["Title"]);
          $("#Mission2").html("<b>Mission:</b> "+fld["Mission"]);
          $("#Subcategory2").html("<b>Subcategory:</b> "+fld["Subcategory"]);
          $("#Financial2").html("<b>Financial:</b> " +fld["Financial"] + "/100");
          $("#Accountability2").html("<b>Accountability & Transparency:</b> " +fld["AccountabilityTransparency"] + "/100");
          $("#ProgramExpenses2").html("<b>Program Expenses: </b>"+fld["ProgramExpenses"]);
          $("#AdminExpenses2").html("<b>Administrative Expenses: </b>"+fld["AdminExpenses"]);
          $("#Efficency2").html("<b>Fundraising Efficency: </b>"+ fld["FundraisingEfficency"]);
          $("#LeaderCompensation2").html("<b>Leader Compensation: </b>"+fld["LeaderCompensation"] + " of expenses");
          if (fld["Location"]["text"].match(locationReg) == null){
            $("#Location2").html("<b>Location: </b> N/A");
          } else {
          $("#Location2").html("<b>Location: </b>"+ fld["Location"]["text"].match(locationReg));
          }


            
          });
         }else{
              $("body").empty();
              $("body").html("<div id=\"header\" class=\"text-center\"><h2>Your top 3 results:<\/h2><!-- Main --><div id=\"main\"><header class=\"major container 75%\"> <ol><li><p id=\"Title1\">Title1<\/p><\/li><li><p id=\"Title2\">Title2<\/p><\/li><li><p id=\"Title3\">Title3<\/p><\/li><\/ol><\/header><a id=\"buttonTitle2\" class=\"button\" href=\"/communityranks.html\">Go see the community's results<\/a></div>");
            var keysSorted = Object.keys(ranker).sort(function(a,b){return ranker[a]-ranker[b]});

             myCharityDataRef.orderByKey().equalTo(keysSorted[0]).on("child_added", function(item){
                var fld = item.val();
                console.log(fld);
                $("#Title1").html(fld["Title"]);
             });
            myCharityDataRef.orderByKey().equalTo(keysSorted[1]).on("child_added", function(item){
                            var fld = item.val();
                            console.log(fld);
                            $("#Title2").html(fld["Title"]);
                         });
            myCharityDataRef.orderByKey().equalTo(keysSorted[2]).on("child_added", function(item){
                            var fld = item.val();
                            console.log(fld);
                            $("#Title3").html(fld["Title"]);
                         });


         }
         
        });
         });
          
        // firstRef.on("child_added", function(orgInfo){
         // var fld = orgInfo
        // });
         
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

function findMaxes(category,n){
  var result =[];
  var ref = new Firebase('https://chariyrank.firebaseio.com/Charity');
  var charity = {};
  ref.orderByChild("Category").equalTo(category).once("value", function(matchesnap){
    charity = matchesnap.val();
    var charit = new Array();
    for (var key in charity ){
      charit.push(charity[key]);
    }
    while (n>0){
      var maxv = Math.max.apply(Math,charit.map(function(o){leg=o['elo']; return 1*parseFloat(leg);}))
      var res = $.grep(charit, function(e){ return e.elo == maxv ; }); 
      result.push(res.pop());
      n--;
    }
    return result;
  });
    
};

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
      if(randomItems.indexOf(matchedCategories[item]) == -1){
        randomItems.push(matchedCategories[item]);
      }
    }
    return randomItems;
};

function calcElo(p1beatp2,p1wins,p1loses,p2wins,p2loses) {
  if(p1beatp2){
    p1wins++;
    p2loses++;
  }else{
    p2wins++;
    p1loses++;
  }

  var newp1Elo=(p2elo+400*(p1wins-p1loses))/(p1wins+p1loses);
  var newp2Elo=(p1elo+400*(p2wins-p2loses))/(p2wins+p2loses);
  return {
    newp1Elo: newp1Elo,
    p1wins: p1wins,
    p1loses: p1loses,
    newp2Elo: newp2Elo,
    p2wins: p2wins,
    p2loses: p2loses}
};

function winvsloss(p1beatp2, p1, p2) {
    //updating the winner's winning score
    //TODO : Add in  a transcation to prevent data races
    var p1Ref = new Firebase("https://chariyrank.firebaseio.com/chariyrank/" + p1);
    var p2Ref = new Firebase("https://chariyrank.firebaseio.com/chariyrank/" + p2);
    var p1win2, p1loses, p1elo, p2wins, p2loses, p2elo;



    if (p1beatp2) {
        //setting the winner score
        p1wins = 1;
        p2loses = 1;

        //setting server data
        p1Ref.once("value", function(item) {
            var fld = item.val();
            console.log(fld);
            p1elo = fld.elo;
            p1wins += fld.wins;
            p1loses = fld.loses;
            //calclate new elo
            // fld.elo = (p1elo+400*(fld.wins-p1loses))/(p1wins+p1loses);
            //set new data
            // itemRef.set(fld);
        });

        //setting the loser score

        p2Ref.once("value", function(item) {
            var fld = item.val();
            console.log(fld);

            p2elo = fld.elo;
            p2wins = fld.wins;
            p2loses += fld.loses;
            fld.elo = (p1elo + 400 * (p2wins - p2loses)) / (p2wins + p2loses);
            fld.loses = p2loses;
            p2Ref.set(fld);
        });

        //updating p1 stuff
        p1Ref.once("value", function(item) {
            var fld = item.val();
            console.log(fld);
            fld.elo = (p2elo + 400 * (p1wins - p1loses)) / (p1wins + p1loses);
            fld.wins = p1wins;
            p1Ref.set(fld);
        });


    } else {
        //setting p2 to winner
        p2wins = 1;
        p1loses = 1;
        //setting p1 to loser

        //setting server data
        p1Ref.once("value", function(item) {
            var fld = item.val();
            console.log(fld);
            p1elo = fld.elo;
            p1wins = fld.wins;
            p1loses += fld.loses;
            //calclate new elo
            // fld.elo = (p1elo+400*(fld.wins-p1loses))/(p1wins+p1loses);
            //set new data
            // itemRef.set(fld);
        });

        //setting the loser score

        p2Ref.once("value", function(item) {
            var fld = item.val();
            console.log(fld);

            p2elo = fld.elo;
            p2wins += fld.wins;
            p2loses = fld.loses;
            fld.elo = (p1elo + 400 * (p2wins - p2loses)) / (p2wins + p2loses);
            fld.wins = p2wins;
            p2Ref.set(fld);
        });

        //updating p1 stuff
        p1Ref.once("value", function(item) {
            var fld = item.val();
            console.log(fld);
            fld.elo = (p2elo + 400 * (p1wins - p1loses)) / (p1wins + p1loses);
            fld.loses = p1loses;
            p1Ref.set(fld);
        });

    }

};

function addToRanker(ranker, elem){
  if(elem in ranker && ranker[elem] != null){
    ranker[elem] = ranker[elem] + 1;
  }else{
    ranker[elem] = 1;
  }
  return ranker;
}

function removeFromRanker(ranker, elem){
  if(elem in ranker && ranker[elem] != null){
    ranker[elem] = null;
  }
  return ranker;
}