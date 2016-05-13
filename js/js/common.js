$(document).ready(function ($){
	navigation()
});

var navigation = function(){
	$(document).on("click","#nav li", function(){
		$("#nav li").removeClass("active");
		$(this).addClass("active");
	})
	
}