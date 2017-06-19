function clearAll() {
  $('#input_field').val('');
};

function displayStuff() {
  $(".stuff").each(function(index) {
    $(this).click(function() {
      var which = document.getElementsByClassName("stuff")[index].innerHTML;
    	var br = which.indexOf("<br>");
    	var entry = which.slice(0, br);
    	var stuffUrl = "https://en.wikipedia.org/wiki/";
    	stuffUrl += entry;
    	window.open(stuffUrl);
  	});
	});
};

function loadSearchList() {
  displayStuff();  
  
  $.ajax({
		url: 
					"https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=" +
        	document.getElementById("input_field").value +
        	"&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max",
    type: "GET",
    contentType: "application/json",
    dataType: "jsonp",
    success: function(data) {
      if (input_field.value != "") {
        $("#theBox").addClass("listBox");
        $("#theBox").removeClass("gridBox");
        $(".stuff").addClass("listDisp");
        $(".stuff").removeClass("gridDisp");

        var keys = Object.keys(data.query.pages);
        $(".stuff").each(function(index) {
          $(this).html(
            data.query.pages[keys[index]].title +
              "<br/><br/>" +
              data.query.pages[keys[index]].extract
          );
        });
        clearAll();
      } 
      else {
        alert("Type Something");
      }
    }
  });
}


function loadSearchGrid() {
  displayStuff();
  
  $.ajax({
    url:
    		"https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=" +
        document.getElementById("input_field").value +
        "&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max",
    type: "GET",
    contentType: "application/json",
    dataType: "jsonp",
    success: function(data) {
      if (input_field.value != "") {
        $("#theBox").addClass("gridBox");
        $("#theBox").removeClass("listBox");
        $(".stuff").addClass("gridDisp");
        $(".stuff").removeClass("listDisp");
        var keys = Object.keys(data.query.pages);
       
          $(".stuff").each(function(index) {
          $(this).html(
            data.query.pages[keys[index]].title +
              "<br/><br/>" +
              data.query.pages[keys[index]].extract
          );
        });
        clearAll();
      } 
      else {
        alert("Type Something");
      }
    }
  });
}
