import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Input, Button,Select,Switch  } from 'antd';
import styles from './PropertyGrid.css';
import propertyHelper from "./PropertyHelper.js";
import ResourceEditor from './ResourceEditor.js';
const Option = Select.Option;
styles.property_field = "property_field";

class PropertyGrid extends React.Component {
	state = {
		propertys: this.props.propertys,
		metadata: this.props.metadata,
		editor_visible:false
	}

	getPropertyValue = (propertyName) => {
		if(!this.props.propertys) return '';
		return this.props.propertys[propertyName];
	}

	handlePropertyChange = (propertyName, value) => {
		this.props.propertys[propertyName] = value;
		this.setState({
			propertys: this.props.propertys
		});
		if(this.props.onPropertyChange){
			this.props.onPropertyChange(propertyName, value);
		}
		
	}
	
	handleSelectStart=(propertyName,res_type)=>{
		this.state.editor_visible=true;
		this.state.editor_property=propertyName;
		this.state.editor_res_type=res_type;
		this.setState({
			...this.state
		});
	}
	
	handleSelectResource=(value)=>{
		this.handlePropertyChange(this.state.editor_property,value);
		this.handleCancelResource();
	}
	
	handleCancelResource=(value)=>{
		this.state.editor_visible=false;
		this.state.editor_property="";
		this.setState({
			...this.state
		});
	}

	GetPropertys = (obj) =>{

		var propertys = [];
		if(obj == null) return propertys;

		for(var field in obj) {
			var meta = this.state.metadata[field];
			if(meta == null) continue;
			propertys.push({
				name: field,
				...meta
			})
		}
		return propertys;
	}
	
	
	renderEditor=(property)=>{
		if(property.type=="image"){
			return(
				<Button onClick={()=>{this.handleSelectStart(property.name,property.type)}}>选择图片</Button>
			);
		}
		
		if(property.type=="music"){
			return(
				<Button onClick={()=>{this.handleSelectStart(property.name,property.type)}}>选择音乐</Button>
			);
		}
		console.log(this.props.propertys);
		if(property.type=="boolean"){
			return(
				 <Switch defaultChecked={this.getPropertyValue(property.name)} checked={this.getPropertyValue(property.name)} onChange={(value)=>{this.handlePropertyChange(property.name,value)}} />
			);
		}
		
		if(property.type=="select" && property.list){
			console.log(1111)
			var select_opts = property.list.map(function(item,i){
				return (
					<Option key={i} value={item}>{item}</Option>
				)
			});
			return(
				<Select defaultValue={this.getPropertyValue(property.name)} value={this.getPropertyValue(property.name)} style={{ width: 120 }} onChange={(value)=>{this.handlePropertyChange(property.name,value)}}>
			      {select_opts}
			    </Select>
			);
		}
		
		return (
			<Input type="text" placeholder={property.displayName}
						         value={this.getPropertyValue(property.name)} 
						         onChange={(e)=>{this.handlePropertyChange(property.name,e.target.value)}} />
		);
	}

	render() {
		const that = this;
		const propertys = that.GetPropertys(that.props.propertys);

		var fileds = propertys.map(function(property, i) {
			return(
				<div key={i} className={styles.property_field}>
				   <Row>
				      <Col span={10}><span>{property.displayName}</span></Col>
				      <Col span={14}>
				         <span>
					         {that.renderEditor(property)}
				         </span>
				      </Col>
				   </Row>
				</div>
			);
		});
		
		
		const ResourceEditModal = (
			<ResourceEditor resource={""}  visible={this.state.editor_visible} res_type={this.state.editor_res_type} onOk={this.handleSelectResource} onCancel={this.handleCancelResource} />
		);

		return(
			<div className="property-list">
	      		{fileds}
	      		{ResourceEditModal}
	        </div>
		)
	}
}

export default PropertyGrid;