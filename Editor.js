import styles from './Editor.css';
import React from 'react';
import "./animate.css"
import uuid from './uuid';
import request from './request';
import { Layout, Menu, Breadcrumb, Icon, Button, Modal, Input, Table, Upload, message, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const { Header, Content, Footer, Sider } = Layout;

styles.logo = "logo";
styles.page_editor = "page_editor";
styles.editor_header = "editor_header";
styles.editor_right_tools = "editor_right_tools";
styles.editor_tools = "editor_tools";
styles.page_slider = "page_slider";
styles.page_content = "page_content";
styles.logo = "logo";

import PropertyGrid from './PropertyGrid.js';
import AnimationList from './AnimationList.js';
import PageList from './PageList.js';
import ContentEditor from './ContentEditor.js';
import ResourceEditor from './ResourceEditor.js';
import metadata from './metadata.js';
class Editor extends React.Component {
	state = {
		model: {
			config: {
				size: {
					width: 320,
					height: 480
				},
				propertys: {
					backgroundImage:"",
					backgroundColor:"",
					backgroundMusic:"",
					effect:"",
					direction: 'vertical',
					loop:true
				}
			},
			pages: [],
			selected_page: "",
			selected_shape: "",
			editor_visible: false,
			setting_visible:false
		}
	}

	handleNewPage = () => {
		this.state.model.pages.push({
			guid: uuid.NewID(),
			title: "页面标题",
			shapes: [],
			propertys: {
				backgroundColor: "",
				backgroundImage: ""
			}
		});
		this.setState({
			...this.state
		});
	}

	handleSelectPage = (page) => {
		this.state.model.selected_page = page.guid;
		this.state.model.selected_page_model = page;
		this.state.model.selected_shape = "";
		this.state.model.selected_shape_model = null;

		this.setState({
			...this.state
		});
	}

	handleRemovePage = () => {
		this.state.model.pages = this.state.model.pages.filter((page) => { return page.guid != action.guid });
		this.setState({
			...this.state
		});
	}

	handleNewShape = (action) => {
		if(this.state.model.selected_page_model) {

			let resource = "双击编辑文本";
			let custom_propertys = {};
			if(action.shape_type == "image") {
				resource = "/resources/default.png";
			}
			if(action.shape_type == "page") {
				resource = "/resources/default.html";
				custom_propertys.width = 200;
				custom_propertys.width = 200;
			}
			if(action.shape_type == "video") {
				resource = "/resources/default.mp4";
			}
			this.state.model.selected_page_model.shapes.push({
				guid: uuid.NewID(),
				shape_type: action.shape_type,
				propertys: {
					backgroundImage: "",
					backgroundColor: "",
					left: 0,
					top: 0,
					color: "rgba(0,0,0,1)",
					fontSize: 14,
					rotate: 0,
					...custom_propertys
				},
				animations: [],
				resource: resource,
				preview_animation: ""
			});
		}

		this.setState({
			...this.state
		});
	}
	
	
	handleSelectShape=(shape)=>{
		this.state.model.selected_shape = shape.guid;		
		this.state.model.selected_shape_model = shape;	
		this.setState({
			...this.state
		});
	}
	
	handlePropertysChange=(propertys)=>{
		if(this.state.model.selected_shape_model)	{
			this.state.model.selected_shape_model.propertys={...this.state.model.selected_shape_model.propertys,...propertys}
			this.setState({
				...this.state
			});
		}
		
	}
	
	handleEditShape=(shape)=>{
		this.state.model.editor_visible =true;
		this.state.model.editor_resource_type=shape.shape_type;
		this.setState({
			...this.state
		});
	}
	
	handleUpdateShape=(resource)=>{
		if(this.state.model.selected_shape_model){
			this.state.model.selected_shape_model.resource=resource;
			this.state.model.editor_visible =false;
			this.state.model.editor_resource_type="";
			
			this.setState({
				...this.state
			});
		}
	}
	
	handleEndEditShape=()=>{
		this.state.model.editor_visible =false;
		this.state.model.editor_resource_type="";
		this.setState({
			...this.state
		});
	}
	
	
	handleSettingStart=()=>{
		this.state.model.setting_visible=true;
		this.setState({
			...this.state
		});
	}
	
	handleSettingEnd=()=>{
		this.state.model.setting_visible=false;
		this.setState({
			...this.state
		});
		
		this.handleSave();
	}
	

    handleRefresh=()=>{
    	this.setState({
			...this.state
		});
    }
    
    handleSave=()=>{
    	const save_url = this.props.save_url;
    	const  content = JSON.stringify(this.state.model);
    	request(save_url,{
    		data:{
    			id:this.props.pageid,
    			key:this.props.userkey,
    			content:content
    		}
    	}).then(function(response){
    		if(response.result){
    			message.info(response.message);
    		}
    		else{
    			message.error("保存失败");
    		}
    	});
    	
    }
    
    handleLoad=()=>{
    	const that = this;
    	request(this.props.get_url,{
    		data:{
    			id:this.props.pageid,
    			key:this.props.userkey
    		}
    	}).then(function(response){
    		if(response.result){
    			console.log(response);
    			const model = JSON.parse(response.data.content);
    			
    			model.config.propertys={
    				...that.state.model.config.propertys,
    				...model.config.propertys
    			}
    			that.setState({
    				model:{
    					...model
    				}
    			});
    			message.info(response.message);
    		}
    		else{
    			message.error("保存失败");
    		}
    	});
    }
    
    handleExit=()=>{
    	window.location.href = this.props.return_url;
    }
    componentDidMount(){
    	this.handleLoad();
    }
    
	render() {
		
		const that = this;
		let selected_pages = this.state.model.pages.filter(function(page){return page.guid==that.state.model.selected_page});
	    let selected_page_model = selected_pages.length==0?null:selected_pages[0];
	   
	  
	    let selected_shape_model = null;
	    if(selected_pages.length!=0){
	   	 	let selected_shapes = selected_page_model.shapes.filter(function(shape){return shape.guid==that.state.model.selected_shape});
	   	 	selected_shape_model =selected_shapes.length==0?null:selected_shapes[0];
	    }

		const {  selected_shape, config } = this.state.model;
		
		const ResourceEditModal = (
			<ResourceEditor resource={selected_shape_model?selected_shape_model.resource:""}  visible={this.state.model.editor_visible} res_type={this.state.model.editor_resource_type} onOk={this.handleUpdateShape} onCancel={this.handleEndEditShape} />
		);
		
		
		const SettingModal=(
			<Modal title="设置" visible={this.state.model.setting_visible} onOk={this.handleSettingEnd} onCancel={this.handleSettingEnd}>		      
	           <PropertyGrid propertys={config.propertys} metadata={metadata} onPropertyChange={this.handleRefresh} />
	        </Modal>
		);

		return(
			<Layout className={styles.page_editor}>
			    <Header className={styles.editor_header}>
			      <div className={styles.logo}>Presentation编辑器</div>
			      <div className={styles.editor_right_tools}>
			      	  <Button ghost={true} onClick={()=>{this.handleSettingStart()}}>设置</Button>
			      	  <Button ghost={true} onClick={()=>{this.handleSave()}}>保存</Button>
				      <Button ghost={true} onClick={()=>{this.handleExit()}}>退出</Button>
			      </div>
			      <div className={styles.editor_tools}>
				      <Button ghost={true} onClick={()=>{this.handleNewShape({shape_type:"text"})}}>文本</Button>
				      <Button ghost={true} onClick={()=>{this.handleNewShape({shape_type:"image"})}}>图片</Button>
				      <Button ghost={true} onClick={()=>{this.handleNewShape({shape_type:"page"})}}>页面</Button>
				      <Button ghost={true} onClick={()=>{this.handleNewShape({shape_type:"chart"})}}>图表</Button>
				      <Button ghost={true} onClick={()=>{this.handleNewShape({shape_type:"video"})}}>视频</Button>			      
			      </div>			      
			    </Header>
			    
			    <Layout>
			      <Sider className={styles.page_slider}>
			        <PageList selected_page_guid={this.state.model.selected_page} list={this.state.model.pages} onNewPage={this.handleNewPage} onSelectPage={this.handleSelectPage}/>
			      </Sider>
			      <Layout >		        
			        <Content className={styles.page_content} >
			            <ContentEditor 
				        	 page={selected_page_model}
				        	 selected_shape={selected_shape}  
				        	 size={config.size}
				        	 onSelectShape={(shape)=>{this.handleSelectShape(shape)}} 
				        	 onPropertyChange={(propertys)=>{this.handlePropertysChange(propertys)}} 
				        	 onEditShape={(shape)=>{this.handleEditShape(shape)}} />
				        {ResourceEditModal}
				        {SettingModal}
			        </Content>			      
			      </Layout>
			      <Sider className={styles.page_slider}>
			        <Tabs defaultActiveKey="1" >
			        	
					    <TabPane tab="属性" key="1">
					        <h4 style={{padding:10}}>页面属性</h4>
					        {selected_page_model?
					    		<PropertyGrid propertys={selected_page_model.propertys} metadata={metadata} onPropertyChange={this.handleRefresh} />:""}
					        <h4 style={{padding:10}}>元素属性</h4>
					    	{selected_shape_model?
					    		<PropertyGrid propertys={selected_shape_model.propertys} metadata={metadata} onPropertyChange={this.handleRefresh} />:""}					   	
					    </TabPane>
					    <TabPane tab="动画" key="2">
					    	{selected_shape_model?<AnimationList animations={selected_shape_model.animations} onAnimationChange={this.handleRefresh} />:""}							
					    </TabPane>
					</Tabs>			       	
			      </Sider>
			    </Layout>
			</Layout>
		)
	}
}

export default Editor;