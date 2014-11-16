 $(document).ready(function() {
             var URL = 'https://chariyrank.firebaseio.com/Charity';
             var myCharityDataRef = new Firebase(URL);
             var categories = retrieveValues(myCharityDataRef, "Category");
             var matchedCategories = [];
             // var charietyKids = myCharityDataRef;
             $('#categoryInput').keypress(function(e) {
                         if (e.keyCode == 13) {
                             var n = 10;
                             var category = $('#categoryInput').val();

                              var result =[];
                              var ref =myCharityDataRef;
                              var charity = {};
                              ref.orderByChild("Category").equalTo(category).once("value", function(matchesnap){
                                $('#categoryInput').val('');
                                charity = matchesnap.val();
                                var charit = new Array();
                                for (var key in charity ){
                                  charit.push(charity[key]);
                                }
                                while (n>0){
                                  var maxv = Math.max.apply(Math,charit.map(function(o){leg=o['elo']; return 1*parseFloat(leg);}))
                                  var res = $.grep(charit, function(e){ return e.elo == maxv ; }); 
                                  var chosen = res.pop();
                                  //charit.remove(chosen);

                                  for(var i = charit.length - 1; i >= 0; i--) {
                                      if(charit[i] === chosen) {
                                         charit.splice(i, 1);
                                      }
                                  }
                                  result.push(chosen);
                                  n--;
                                }
                                console.log(result);
                                

                               $("#option").css('visibility','visible');
                               $('html, body').animate({
                                   scrollTop: $("#Title1").offset().top
                               }, 2000);

                               var locationReg = "[A-Za-z ]*, [A-Z]{2}";
                               

                               for(i=0;i<10;i++){

                                $("#Title"+i.toString()).html(result[i]["Title"]);
                                $("#buttonTitle"+i.toString()).text(result[i]["Title"]);
                                $("#Mission"+i.toString()).html("<b>Mission:</b> "+result[i]["Mission"]);
                                $("#Subcategory"+i.toString()).html("<b>Subcategory:</b> "+result[i]["Subcategory"]);
                                $("#Financial"+i.toString()).html("<b>Financial:</b> " +result[i]["Financial"] + "/100");
                                $("#Accountability"+i.toString()).html("<b>Accountability & Transparency:</b> " +result[i]["AccountabilityTransparency"] + "/100");
                                $("#ProgramExpenses"+i.toString()).html("<b>Program Expenses: </b>"+result[i]["ProgramExpenses"]);
                                $("#AdminExpenses"+i.toString()).html("<b>Administrative Expenses: </b>"+result[i]["AdminExpenses"]);
                                $("#Efficency"+i.toString()).html("<b>Fundraising Efficency: </b>"+ result[i]["FundraisingEfficency"]);
                                $("#LeaderCompensation"+i.toString()).html("<b>Leader Compensation: </b>"+result[i]["LeaderCompensation"] + " of expenses");
                                if (result[i]["Location"]["text"].match(locationReg) == null){
                                  $("#Location"+i.toString()).html("<b>Location: </b> N/A");
                                } else {
                                $("#Location"+i.toString()).html("<b>Location: </b>"+ result[i]["Location"]["text"].match(locationReg));
                                }


                               }

                               $("#ComTitle1").html(result[0]["Title"]);
                               $("#ComTitle2").html(result[1]["Title"]);
                               $("#ComTitle3").html(result[2]["Title"]);
                               $("#ComTitle4").html(result[3]["Title"]);
                               $("#ComTitle5").html(result[4]["Title"]);
                               $("#ComTitle6").html(result[5]["Title"]);
                               $("#ComTitle7").html(result[6]["Title"]);
                               $("#ComTitle8").html(result[7]["Title"]);
                               $("#ComTitle9").html(result[8]["Title"]);
                               $("#ComTitle10").html(result[9]["Title"]);

                              });






                             // myCharityDataRef.orderByKey().equalTo(randomCharity[0]).on("child_added", function(item) {
                             //     var result[i] = item.val();

                             //     console.log(result[i]);
                             //     $("#Title1").html(result[i]["Title"]);
                             //     $("#buttonTitle1").text(result[i]["Title"]);
                             //     $("#Mission1").html("<b>Mission:</b> " + result[i]["Mission"]);
                             //     $("#Subcategory1").html("<b>Subcategory:</b> " + result[i]["Subcategory"]);
                             //     $("#Financial1").html("<b>Financial:</b> " + result[i]["Financial"] + "/100");
                             //     $("#Accountability1").html("<b>Accountability & Transparency:</b> " + result[i]["AccountabilityTransparency"] + "/100");
                             //     $("#ProgramExpenses1").html("<b>Program Expenses: </b>" + result[i]["ProgramExpenses"]);
                             //     $("#AdminExpenses1").html("<b>Administrative Expenses: </b>" + result[i]["AdminExpenses"]);
                             //     $("#Efficency1").html("<b>Fundraising Efficency: </b>" + result[i]["FundraisingEfficency"]);
                             //     $("#LeaderCompensation1").html("<b>Leader Compensation: </b>" + result[i]["LeaderCompensation"] + " of expenses");
                             //     if (result[i]["Location"]["text"].match(locationReg) == null) {
                             //         $("#Location1").html("<b>Location: </b> N/A");
                             //     } else {
                             //         $("#Location1").html("<b>Location: </b>" + result[i]["Location"]["text"].match(locationReg));
                             //     }
                             // });
            };
})

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
