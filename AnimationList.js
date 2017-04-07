import React from 'react';
import { Row, Col,Input,Collapse,Button,Select ,InputNumber ,Switch,Icon ,Tooltip  } from 'antd';
const Panel = Collapse.Panel;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
import styles from './AnimationList.css';
import animations from "./animations.js"

styles.panel_list = "panel_list";
styles.animation_delete = "animation_delete";
styles.animation_item = "animation_item";
styles.padding_button = "padding_button";

class AnimationList extends React.Component {
	
	state={
		animations:this.props.animations
	}
	
	
	handleAddAnimation=()=>{
		
		this.props.animations.push({
			name:"none",
			duration:1,
			timingFunction:"ease",
			delay:0,
			iterationCount:1,
			direction:"normal"
		});
		this.setState({
			...this.state
		});
		
		this.props.onAnimationChange();
	}
	
	handleUpdateAnimation=(animation,propertyName,value)=>{
		
		animation[propertyName]=value;
		this.setState({...this.state});
		this.props.onAnimationChange();
		this.handlePreviewAnimation();
	}
	
	handleRemoveAnimation=(index)=>{
		this.state.animations =this.state.animations.filter(function(el,i){
			return i!=index;
		});
		this.setState({...this.state});
		this.props.onAnimationChange();
	}
	
	handlePreviewAnimation=()=>{	

		setTimeout(function(){
			animations.previewAnimation();
		},10);
		
	}
	
	render() {
		
		const that = this;
		const animation_options=animations.ANIMATION_LIST.map(function(group,i){			
			return (
				<OptGroup label={group.groupName} key={i}>
			     {
			     	group.animations.map(function(ani,index){
			     		return (<Option value={ani.name} key={index}>{ani.text}</Option>);
			     	})
			     }
			    </OptGroup>
			);
			
		});
		const field_width=6;
		
		const animation_list = this.props.animations!=null?this.props.animations.map(function(animation,i){
			
			return(
				<Panel header={"动画"+i} key={i+1} className={styles.panel_list}>
				    <div className={styles.animation_delete} onClick={()=>{that.handleRemoveAnimation(i)}}>
				    	<Tooltip placement="left" title="删除动画">
					    	<Icon type="delete" />
					  	</Tooltip>
	  				</div>
			      	<Row className={styles.animation_item}>
				      <Col span={field_width}>
				      	动画
				      </Col>
				      <Col span={24-field_width}>
				      	<Select defaultValue={animation.name} style={{width:'100%'}} onChange={(value)=>{ that.handleUpdateAnimation(animation,"name",value)}} >
				      		<Option value="none">无</Option>
						    {animation_options}
						</Select>
				      </Col>
				    </Row>
				    <Row className={styles.animation_item}>
				      <Col span={field_width}>
				      	时长
				      </Col>
				      <Col span={24-field_width}>
				      	<InputNumber min={0} max={10} step={0.1} defaultValue={animation.duration} onChange={(value)=>{ that.handleUpdateAnimation(animation,"duration",value)}} />
				      </Col>
				    </Row>
				    <Row className={styles.animation_item}>
				      <Col span={field_width}>
				      	延时
				      </Col>
				      <Col span={24-field_width}>
				      	<InputNumber min={0} max={10} step={0.1} defaultValue={animation.delay}  onChange={(value)=>{ that.handleUpdateAnimation(animation,"delay",value)}} />
				      </Col>
				    </Row>
				    <Row className={styles.animation_item}>
				      <Col span={field_width}>
				      	次数
				      </Col>
				      <Col span={24-field_width}>
				      	<InputNumber min={0} max={10} defaultValue={animation.iterationCount}  onChange={(value)=>{ that.handleUpdateAnimation(animation,"iterationCount",value)}} />
				      </Col>
				    </Row>
				   
			    </Panel>
			);
			
		}) : [];
		
		
		return (
	      <div>
	      	<Collapse defaultActiveKey={['1']} bordered={false} >
			    {animation_list}
			</Collapse>
			<div className={styles.padding_button}>
			 	<Row>
			      <Col span={12}>
			      	<Button type="success" icon="plus-circle-o" onClick={this.handleAddAnimation}>添加</Button>
			      </Col>
			      <Col span={12}>
			      	<Button type="primary" icon="play-circle" onClick={this.handlePreviewAnimation}>预览</Button>
			      </Col>
			    </Row>
			</div>
	      </div>
	    )
	}
}

export default AnimationList;