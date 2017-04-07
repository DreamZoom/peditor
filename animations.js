import jquery from 'jquery';

const $ = jquery;

export default {
	convertAnimationValue:function(ani_prop,value){
		
		if(ani_prop=="duration"){
			return value+"s";
		}
		if(ani_prop=="delay"){
			return value+"s";
		}
		if(ani_prop=="iterationCount" && value==0){
			
			return "infinite";
		}
		return value;
	},
	convertAnimationAttribute:function(animation){
		var ani_attr =[];
		for (var a in animation) {
			ani_attr.push(this.convertAnimationValue(a,animation[a]));
		}
		return ani_attr.join(" ");
	},
	getAnimations:function(animations){
		var ani_list=[];
		for (var i=0;i<animations.length; i++) {
			ani_list.push(this.convertAnimationAttribute(animations[i]));
		}
		return ani_list.join("|");
	},
	
	previewAnimation:function(){
		
		var selected_shape = $(".shape.selected");
		
		var animations=$(selected_shape).attr("data-animations")||"";
		var animation_list = animations.split('|');
		
		if(animation_list.length==0) return;
		
		var i = 0;
		var $animation_element = $(selected_shape).find(".animation");
		$animation_element.css({
			animation:""
		});	
		$animation_element.bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			i++;
			if(i>animation_list.length-1){
				$animation_element.unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend");
				$animation_element.css({
					animation:""
				});	
			}
			else{
				$animation_element.css({
					animation:animation_list[i]
				});	
			}						
		});
		$animation_element.css({
			animation:animation_list[i]
		});
	},
	previewPageAnimation:function(){
		
	    $("[data-animations]").each(function(i,selected_shape){
	    	var animations=$(selected_shape).attr("data-animations")||"";
			var animation_list = animations.split('|');
			if(animation_list.length==0) return;
			
			var i = 0;
			var $animation_element = $(selected_shape).find(".animation");
			$animation_element.css({animation:""});	
			$animation_element.bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				i++;
				if(i>animation_list.length-1){
					$animation_element.unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend");
					$animation_element.css({animation:""});	
				}
				else{
					$animation_element.css({animation:animation_list[i]});	
				}						
			});
			$animation_element.css({animation:animation_list[i]});
	    });
		
		
	},
	
	ANIMATION_LIST: [{
			groupName: "attention_seekers",
			animations: [
				{ text: "bounce", name: "bounce", },
				{ text: "flash", name: "flash", },
				{ text: "pulse", name: "pulse", },
				{ text: "rubberBand", name: "rubberBand", },
				{ text: "shake", name: "shake", },
				{ text: "headShake", name: "headShake", },
				{ text: "swing", name: "swing", },
				{ text: "tada", name: "tada", },
				{ text: "wobble", name: "wobble", },
				{ text: "jello", name: "jello" }
			]
		},
		{
			groupName: "bouncing",
			animations: [
				{ text: "bounceIn", name: "bounceIn", },
				{ text: "bounceInDown", name: "bounceInDown", },
				{ text: "bounceInLeft", name: "bounceInLeft", },
				{ text: "bounceInRight", name: "bounceInRight", },
				{ text: "bounceInUp", name: "bounceInUp", },
				{ text: "bounceOut", name: "bounceOut", },
				{ text: "bounceOutDown", name: "bounceOutDown", },
				{ text: "bounceOutLeft", name: "bounceOutLeft", },
				{ text: "bounceOutRight", name: "bounceOutRight", },
				{ text: "bounceOutUp", name: "bounceOutUp" },
			]
		},
		{
			groupName: "fading",
			animations: [
				{ text: "fadeIn", name: "fadeIn", },
				{ text: "fadeInDown", name: "fadeInDown", },
				{ text: "fadeInDownBig", name: "fadeInDownBig", },
				{ text: "fadeInLeft", name: "fadeInLeft", },
				{ text: "fadeInLeftBig", name: "fadeInLeftBig", },
				{ text: "fadeInRight", name: "fadeInRight", },
				{ text: "fadeInRightBig", name: "fadeInRightBig", },
				{ text: "fadeInUp", name: "fadeInUp", },
				{ text: "fadeInUpBig", name: "fadeInUpBig", },
				{ text: "fadeOut", name: "fadeOut", },
				{ text: "fadeOutDown", name: "fadeOutDown", },
				{ text: "fadeOutDownBig", name: "fadeOutDownBig", },
				{ text: "fadeOutLeft", name: "fadeOutLeft", },
				{ text: "fadeOutLeftBig", name: "fadeOutLeftBig", },
				{ text: "fadeOutRight", name: "fadeOutRight", },
				{ text: "fadeOutRightBig", name: "fadeOutRightBig", },
				{ text: "fadeOutUp", name: "fadeOutUp", },
				{ text: "fadeOutUpBig", name: "fadeOutUpBig" },
			]
		},
		{
			groupName: "rotating",
			animations: [
				{ text: "rotateIn", name: "rotateIn", },
				{ text: "rotateInDownLeft", name: "rotateInDownLeft", },
				{ text: "rotateInDownRight", name: "rotateInDownRight", },
				{ text: "rotateInUpLeft", name: "rotateInUpLeft", },
				{ text: "rotateInUpRight", name: "rotateInUpRight", },
				{ text: "rotateOut", name: "rotateOut", },
				{ text: "rotateOutDownLeft", name: "rotateOutDownLeft", },
				{ text: "rotateOutDownRight", name: "rotateOutDownRight", },
				{ text: "rotateOutUpLeft", name: "rotateOutUpLeft", },
				{ text: "rotateOutUpRight", name: "rotateOutUpRight" },
			]
		},
		{
			groupName: "缩放",
			animations: [
				{ text: "zoomIn", name: "zoomIn", },
				{ text: "zoomInDown", name: "zoomInDown", },
				{ text: "zoomInLeft", name: "zoomInLeft", },
				{ text: "zoomInRight", name: "zoomInRight", },
				{ text: "zoomInUp", name: "zoomInUp", },
				{ text: "zoomOut", name: "zoomOut", },
				{ text: "zoomOutDown", name: "zoomOutDown", },
				{ text: "zoomOutLeft", name: "zoomOutLeft", },
				{ text: "zoomOutRight", name: "zoomOutRight", },
				{ text: "zoomOutUp", name: "zoomOutUp" },
			]
		},
		{
			groupName: "slide",
			animations: [

				{ text: "slideInDown", name: "slideInDown", },
				{ text: "slideInLeft", name: "slideInLeft", },
				{ text: "slideInRight", name: "slideInRight", },
				{ text: "slideInUp", name: "slideInUp", },
				{ text: "slideOutDown", name: "slideOutDown", },
				{ text: "slideOutLeft", name: "slideOutLeft", },
				{ text: "slideOutRight", name: "slideOutRight", },
				{ text: "slideOutUp", name: "slideOutUp" },
			]
		},
		{
			groupName: "specials",
			animations: [
				{ text: "hinge", name: "hinge", },
				{ text: "rollIn", name: "rollIn", },
				{ text: "rollOut", name: "rollOut", },
				{ text: "lightSpeedIn", name: "lightSpeedIn", },
				{ text: "lightSpeedOut", name: "lightSpeedOut", },
				{ text: "flip", name: "flip", },
				{ text: "flipInX", name: "flipInX", },
				{ text: "flipInY", name: "flipInY", },
				{ text: "flipOutX", name: "flipOutX", },
				{ text: "flipOutY", name: "flipOutY" },
			]
		}
	]
}