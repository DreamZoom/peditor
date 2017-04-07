import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button, Modal, Input, Table, Upload, message, Tabs, Row, Col, InputNumber } from 'antd';
class CreateFrom extends React.Component {

	state = {
		data: {
			width: 360,
			height: 640,
			title: "新页面",
			description: "新页面"
		}
	}

	handleUpdate = (propertyName, value) => {
		this.state.data[propertyName] = value;
		this.setState({
			data: {
				...this.state.data,
			}
		});
	}

	handleOk = () => {
//		() => { dispatch({ type: 'presentation/go_create', payload: { id: -1, width: presentation.width, height: presentation.height } }) }
		this.props.onOk({...this.state.data});
	}

	handleCancel = () => {
//		() => { dispatch({ type: 'presentation/end_create' }) }
		this.props.onCancel();
	}
	render() {
		return(
			<Modal title="新建展现" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
				<Row style={{paddingTop:10}}>
			      <Col span={6}>
			      	标题
			      </Col>
			      <Col span={18}>
			      	<Input placeholder="页面标题" value={this.state.data.title} onChange={(e)=>{ this.handleUpdate("title",e.target.value) }} />
			      </Col>
			    </Row>
			    <Row style={{paddingTop:10}}>
			      <Col span={6}>
			      	描述
			      </Col>
			      <Col span={18}>
			      	<Input placeholder="页面描述" value={this.state.data.description} onChange={(e)=>{ this.handleUpdate("description",e.target.value) }} />
			      </Col>
			    </Row>
	            <Row style={{paddingTop:10}}>
			      <Col span={6}>
			      	宽度
			      </Col>
			      <Col span={18}>
			      	<InputNumber min={0} max={10000} step={1} value={this.state.data.width} onChange={(value)=>{ this.handleUpdate("width",value) }} />
			      </Col>
			    </Row>
			    <Row style={{paddingTop:10}}>
			      <Col span={6}>
			      	 高度
			      </Col>
			      <Col span={18}>
			      	<InputNumber min={0} max={10000} step={1} value={this.state.data.height} onChange={(value)=>{ this.handleUpdate("height",value) }} />
			      </Col>
			    </Row>
	        </Modal>
		)
	}
}

export default CreateFrom;