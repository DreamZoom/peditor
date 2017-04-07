import React from 'react';
import styles from './ContentEditor.css';
import EditableShape from "./EditableShape.js"
import ShapeRender from "./ShapeRender.js"
import siteconfig from "./siteconfig.js"

styles.page_warpper = "page_warpper";
styles.shape_content = "shape_content";

class ContentEditor extends React.Component {

	renderContent = (shape) => {
		return ShapeRender.render(shape);
	}

	render() {
		const { size, page, selected_shape, onSelectShape, onEditShape,onPropertyChange } = this.props;

		if(!page) {
			return(
				<div className={styles.page_warpper} style={size}>
				    <h3 style={{textAlign:"center",fontSize:24}}>请选择页面编辑</h3>
				</div>
			);
		}

		const that = this;
		const shapeElements = page.shapes.map(function(shape, i) {

			return(
				<EditableShape key={i} shape={shape} active={shape.guid==selected_shape}
					onClick={()=>{onSelectShape(shape)}}
					onPropertyChange={(propertys)=>{onPropertyChange(propertys)}}
					onEditContent={()=>{onEditShape(shape)}}>
				  <div className={styles.shape_content}>
				  	{that.renderContent(shape)}
				  </div>
				</EditableShape>
			);
		})
        
        let page_style={};
        if(page){
        	page_style={...size,...page.propertys,backgroundImage:`url(${siteconfig.URL(page.propertys.backgroundImage)})`}
        }
        
		return(
			<div className={styles.page_warpper} style={page_style}>
			    {shapeElements}
			</div>
		);
	}
}

export default ContentEditor;