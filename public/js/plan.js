var ready = function(){
	$("#new").click(function(){
		$(".firststep").toggle();
		$("#pricerange").toggle();
	});

	$("#maincarriers div div div").click(function(){
		$("#maincarriers").toggle();
		$("#pricerange").toggle();
	});

	$("#renew").click(function(){
		$(".firststep").toggle();
		$("#maincarriers").toggle();
	});


}

$(document).ready(ready);
$(document).on('page:load',ready);