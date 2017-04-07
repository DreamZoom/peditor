import React from 'react';
import jquery from 'jquery';
import animations from "./animations.js"
class AnimationProperty extends React.Component {
	render() {
		return (
	      <div ref="dataElement">
	         <div className="animation">
	         	{this.props.children}
	         </div>
	      </div>
	    )
	}
	
	componentDidMount(){
		console.log(animations.getAnimations(this.props.animations))
		jquery(this.refs.dataElement).attr("data-animations",animations.getAnimations(this.props.animations));
	}
}

export default AnimationProperty;