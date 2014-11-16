$(document).ready(function(){
	$("#options .panel-body").hover(
	  function() {
	    $(this).addClass('options-hover');
	  }, function() {
	    $(this).removeClass('options-hover');
	  }
	);
});