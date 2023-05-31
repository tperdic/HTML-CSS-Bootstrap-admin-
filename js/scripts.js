$(document).ready( function() {
	$('.datepicker').datepicker({
		format: 'mm/dd/yy'
	});
	
	$(function(){
		$('.scroll').jScrollPane();
	});
	
	$(".trigger").click(function(){
		$(".menu").toggleClass("open");
	});
	
	var fixedElement = $("#fixed");
	$("#swipe_trigger").click(function(){
			fixedElement.addClass("fixed_animating");
			fixedElement.removeClass("fixed");

			$('html, body').animate({
					scrollTop: $("#swipemark").offset().top - 30
			}, 300,
					function() {
					fixedElement.removeClass('fixed_animating');
					});
	});
	

	var m = $( window ).height();
	var c = $("#swipemark") ;
	var ch = c.position().top - m;
	
	
	
	
	
	$(window).scroll(function() {
		
		if ($( window ).height() > ch){fixedElement.removeClass("fixed");}
		
		
			var windowpos = $(window).scrollTop();
			//console.log(ch, windowpos);

			if (windowpos <= ch && !fixedElement.hasClass("fixed_animating")) 
			{
					fixedElement.addClass("fixed");
				
			} else if (windowpos > ch && !fixedElement.hasClass("fixed_animating"))
			{
					fixedElement.removeClass("fixed");
			}
	});


});









//drag and drop upload

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");
dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });
inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });
dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });
["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }
dropZoneElement.classList.remove("drop-zone--over");
  });
});
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
// First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }
// First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }
thumbnailElement.dataset.label = file.name;
// Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
} 

// end d&d upload