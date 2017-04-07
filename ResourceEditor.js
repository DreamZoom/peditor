import React from 'react';
import ResourceList from './ResourceList.js';
import { Layout, Menu, Breadcrumb, Icon, Button, Modal, Input, Table,Upload ,message} from 'antd';

class ResourceEditor extends React.Component {
	
	  state={
	  	resource:this.props.resource,
	  	res_type:this.props.res_type
	  }
	  
	  handleChange=(value,notify)=>{
	  	
	  	 this.state.resource = value;
	  	 this.setState({
	  	 	 ...this.state
	  	 })
	  	 
	  	 if(notify){
	  	 	 this.handleOk();
	  	 }
	  }
	  
	  handleOk=()=>{
	  	 if(this.props.onOk){
	  	 		this.props.onOk(this.state.resource);
	  	 }
	  }
	  
	  readerEditor=(res_type)=>{
	  	 if(res_type=='text'){
	  	 		return (<Input type="textarea" placeholder="请输入内容" autosize defaultValue={this.props.resource}  onChange={(evt)=>{this.handleChange(evt.target.value)}}/>);
	  	 }
	  	 
	  	 if(res_type=='page'){
	  	 		return (<Input type="textarea" placeholder="请输入url" autosize defaultValue={this.props.resource}  onChange={(evt)=>{this.handleChange(evt.target.value)}}/>);
	  	 }
	  	 
	  	 if(res_type=='image' || res_type=='music' || res_type=='video'){
	  	 		return (<ResourceList res_type={res_type}  onSelectResource={(res)=>{ this.handleChange(res.ResContent,true)}}/>);
	  	 }
	  }
	  
		render() {
			  
				return (
			      <Modal title="编辑内容" visible={this.props.visible} onOk={this.handleOk} onCancel={this.props.onCancel}>		      
		           {this.readerEditor(this.props.res_type)}
		        </Modal>
			  )
		}
}

export default ResourceEditor;