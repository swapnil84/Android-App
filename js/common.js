$(document).ready(function ($){
	$("#nav li.active a").off("click");
	search();
	goBack();
	menu();
	homepage();
	watchlist();
	navigation();
	companyProfile();
});

var homepage = function(){
	$(document).on("click",".profileBack", function(){
		$("#page").fadeIn();
		$("#companyProfil").fadeOut();	
	})
}

var companyProfile = function(){
	$(document).on("click",".company .ge", function(){
		$("#page").fadeOut();
		$("#companyProfil").fadeIn();	
	})	
}

var watchlist = function(){	
	$(document).on("click","#cnav li a.watchlist", function(){		
		$("#companyProfil").fadeOut();
		$.mobile.changePage("#watchlist", { transition: "fade"}, true, true);
		$("#nav li").removeClass("active");
		$("#nav li a.watchlist").parent().addClass("active");
		$("#page").fadeIn();		
	})
	
}

var navigation = function(){
	
	$(document).on("click","#nav li a[data-slide='true']", function(event){		
		var $screenWidth = $(".content-wrapper").outerWidth(true);
		var $activeIndex = $(this).parent().index();
		var $targetIndex = $("#nav li.active").index();
		var $targetPanel = $(this).attr("data-panel");
		var $thisPanel = $('section.active');
		
		if($targetIndex < $activeIndex){
			$thisPanel.animate({
				left:"-"+$screenWidth+""
			},400,function(){
				$thisPanel.removeClass("active");
			})
			
			$("section#"+$targetPanel).css("left",$screenWidth).animate({
				left:"0px"
			},400).addClass("active");
		}
		else{
			$thisPanel.animate({
				left:$screenWidth
			},400,function(){
				$thisPanel.removeClass("active");
			})
			
			$("section#"+$targetPanel).css("left","-"+$screenWidth+"").animate({
				left:"0px"
			},400).addClass("active");
		}
		$("#nav li").removeClass("active");
		$("#nav li a").attr("data-slide","true");
		$(this).parent().addClass("active");
		$(this).attr("data-slide","false");
	})
	
}

var search = function(){
	$(document).on("click",".search a", function(){
		$("section").fadeOut().removeClass("active");
		$("section#searchResult").fadeIn().addClass("active");
		$("#nav").hide();
		$(".menu").hide();
		$(".back").show();	
		$(this).parent().parent().addClass("selected");
	})
}

var goBack = function(){
	$(document).on("click",".back", function(){
		$("#nav").show();
		$(".menu").show();
		$(".back").hide();
		$("section#searchResult").fadeOut().removeClass("active");		
		$("#search ul.selected").removeClass("selected");
		$("section#"+$("#nav li.active a").attr("data-panel")+"").show().addClass("active");
	})	
}

var menu = function(){
	$(document).on("click",".menu", function(){
		if($("#page").css("right")=="auto" || $("#page").css("right")=="0px"){
			$("#page").animate({
				right:"50%"
			},300);
			$("footer").animate({
				right:"50%"
			},300);
			$("html").addClass("slide-menu");
		}
		else{
			$("#page").animate({
				right:"0%"
			},300,function(){
				$("html").removeClass("slide-menu");
			});
			$("footer").animate({
				right:"0%"
			},300);			
		}
		
	})
}


$(document).on('pageinit', "#page", function() {
    // for example: displayFooter();
    //loadContent("home");
   // loadMenu("default");
});

function loadContent(location) {
    return $('#content').load("content/"+location+".html", function() { 
        $(this).trigger('create');
    });
}

var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      //var smallImage = document.getElementById('smallImage');
      //smallImage.style.display = 'block';
      //smallImage.src = "data:image/jpeg;base64," + imageData;
	  $("#page").hide();
	  $("#companyProfil").show();
    }

    function onPhotoURISuccess(imageURI) {

      var largeImage = document.getElementById('largeImage');
      largeImage.style.display = 'block';
      largeImage.src = imageURI;
    }

    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality : 75,
  destinationType : Camera.DestinationType.DATA_URL,
  sourceType : Camera.PictureSourceType.CAMERA,
  allowEdit : true,
  encodingType: Camera.EncodingType.JPEG,
  targetWidth: 100,
  targetHeight: 100,
  popoverOptions: CameraPopoverOptions,
  saveToPhotoAlbum: false });
    }

    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    function onFail(message) {
      //capturePhoto();
    }
	
	/*document.addEventListener('backbutton', onBackKeyDown, false);

	function onBackKeyDown(event) {
		// Handle the back button
		event.preventDefault();
		if($("#nav li a.home").parent().not(".active")){
			$.mobile.changePage("#home", { transition: "slide"}, true, true);
			$("#nav li").removeClass("active");
			$("#nav li a.home").parent().addClass("active");					
		}			
	}*/
	document.addEventListener("backbutton", function(e){
	if($.mobile.activePage.is('#home')){
		/* 
		 Event preventDefault/stopPropagation not required as adding backbutton
		  listener itself override the default behaviour. Refer below PhoneGap link.
		*/
		//e.preventDefault();
		navigator.app.exitApp();
	}
	else {
		navigator.app.backHistory();
		$("#nav li").removeClass("active");
		$("#nav li a.home").parent().addClass("active");
	}
	}, false);
	