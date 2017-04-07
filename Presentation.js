
import React from 'react';
import PresentationList from './PresentationList.js';
import CreateFrom from './CreateFrom.js';
import { Layout, Menu, Breadcrumb, Icon, Button,Modal ,Input,Table,Upload,message,Tabs,Row,Col,InputNumber} from 'antd';
import request from './request';

class Presentation extends React.Component {
	
	state={
		show_create:false
	}
	
	handleCreate=()=>{
		this.setState({
			show_create:true
		});
	}
	
	handleOk=(data)=>{
		const that = this;
		
		var defaultState ={
			config: {
				size: {
					width: data.width||320,
					height: data.height||480
				}
			},
			pages: [],
			selected_page: "",
			selected_shape: "",
			text_editor_visible:false,
			resource_editor_visible:false
		};
		var body = JSON.stringify(defaultState);
		
		request(this.props.create_url,{
    		data:{
    			key:that.props.userkey,
    			body:body,
    			...data
    		}
    	}).then(function(response){
    		if(response.result){
    			message.info(response.message);
    			that.handleCancel();
    		}
    		else{
    			message.error("保存失败");
    		}
    		
    	});
	}
	
	handleCancel=()=>{
		this.setState({
			show_create:false
		});
	}
	
	handleEdit=(record)=>{
		window.location.href=`${this.props.edit_url}?id=${record.ID}`;
	}
	
	handleShow=(record)=>{
		window.location.href=`${this.props.show_url}?id=${record.ID}`;
	}

	render() {
		const TextEditModal = (
	        <CreateFrom visible={this.state.show_create} onOk={(data)=>{this.handleOk(data)}} onCancel={this.handleCancel} />
		);
		return(
			<div>
				<Button onClick={()=>{this.handleCreate()}}>创建</Button>
				<PresentationList userkey={this.props.userkey} onEdit={(record)=>{ this.handleEdit(record)}}  onShow={(record)=>{ this.handleShow(record) }}/>
				{TextEditModal}
			</div>
		)
	}
}

export default Presentation;