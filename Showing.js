import React from 'react';
import Swiper from 'react-id-swiper';
import ShapeRender from "./ShapeRender.js"
import AnimationProperty from "./AnimationProperty.js"
import styles from './Showing.css';
import animations from "./animations.js";
import jquery from 'jquery';
import siteconfig from "./siteconfig.js"

styles.shape="shape";
styles.swiper_page="swiper_page";
styles.swiper="swiper";
styles.showpage_warpper="showpage_warpper";

class Showing extends React.Component {

	renderContent = (shape) => {
		return ShapeRender.render(shape);
	}

	render() {

		const that = this;
		

		if(this.props.data == null) {
			return(
				<div>
			      	当前无数据
			    </div>
			)
		} else {
			
			const params = {
				direction: this.props.data.config.propertys.direction||'vertical',
				noSwiping: true,
	    		noSwipingClass: 'swipe-no-swiping',
	    		loop:this.props.data.config.propertys.loop&&true,
				mousewheelControl: true,
				effect: this.props.data.config.propertys.effect||'cube',
				onInit: function() {
					animations.previewPageAnimation();
				},
				onSlideChangeEnd: function() {
					animations.previewPageAnimation();
				}
			};

			const pagelist = this.props.data.pages.map(function(page, i) {
				console.log(page)
				const shapelist = page.shapes.map(function(shape, index) {
					const { rotate } = shape.propertys;
					const custom_styles = { transform: "rotateZ(" + rotate + "deg)", ...shape.propertys }
					return(
						<div key={i+index} className={styles.shape} style={custom_styles}>
						    <AnimationProperty animations={shape.animations}>
								{that.renderContent(shape)}
							</AnimationProperty>
						</div>
					);
				});
				let page_style={};
		        if(page){
		        	page_style={...page.propertys,backgroundImage:`url(${siteconfig.URL(page.propertys.backgroundImage)})`}
		        }
				return(
					<div key={i} className={styles.swiper_page} style={page_style}>
					   <div className={styles.swiper} >
					       {shapelist}
					   </div>
					</div>
				);
			});

			return(
				<div className={styles.showpage_warpper} ref="warpper">
					<Swiper {...params}>
		      	 		{pagelist}
		      	 	</Swiper>
		        </div>
			);
		}

	}
	
	
	componentDidUpdate(){
		var  warpper = this.refs.warpper;
		var  page = this.refs.page;	
		
		const {width,height} = this.props.data.config.size;
		
		var scaleWidth=warpper.offsetWidth/width;
		var scaleHeight=warpper.offsetHeight/height;	
		var scale =1;
		scale= Math.min(scaleWidth,scaleHeight);
		jquery("."+styles.swiper).css({
			width:width+"px",
			height:height+"px",
			transform:"translate(-50%, -50%) scale("+scale+")"
		})
	}
}

export default Showing;