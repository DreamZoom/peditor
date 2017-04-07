import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button, Modal, Input, Table,Upload ,message} from 'antd';
import jquery from 'jquery';
import request from "./request.js";
import siteconfig from "./siteconfig.js"
class ResourceList extends React.Component {
	state = {
		data: [],
		pagination: {
			current:1,
			pageSize:5
		},
		loading: false,
	}
	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		pagination.pageSize = 5;
		this.setState({
			pagination: pager,
		});
		this.fetch({
			pagesize: pagination.pageSize,
			page: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order,
			...filters			
		});
	}
	fetch = (params = {}) => {
		
		this.setState({ loading: true });
		jquery.ajax({
			url: siteconfig.SITE_RESOURCE_MANAGER_API+'/List',
			method: 'get',
			data: {
				page:this.state.pagination.current,
				pagesize: this.state.pagination.pageSize,
				res_type: this.props.res_type,
				...params
			},
			dataType: "jsonp",
		}).then((response) => {
			const pagination = { ...this.state.pagination,total:response.data.total };
			this.setState({
				loading: false,
				data: response.data.rows,
				pagination,
			});
		});
	}
	componentDidMount() {
		this.fetch();
	}
	render() {

		const { onSelectResource } = this.props;

		const columns = [{
			title: '资源名称',
			dataIndex: 'ResName',
			sorter: true
		}, {
			title: '资源内容',
			dataIndex: 'ResContent'
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<Button onClick={()=>{onSelectResource(record)}} >使用</Button>
			),
		}];
		
		const that = this;

		const upload_props = {
			name: 'resource',
			action: siteconfig.SITE_RESOURCE_MANAGER_API+'/UploadResource',
			headers: {
				authorization: 'authorization-text',
			},
			data: {
				res_type: this.props.res_type
			},
			onChange(info) {
				if(info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if(info.file.status === 'done') {
					message.success(`${info.file.name} 文件上传成功`);
					that.fetch();
				} else if(info.file.status === 'error') {
					message.error(`${info.file.name} 文件上传失败.`);
				}
			},
		};

		return(
			<div>
			 	<div style={{padding:10}}>
		          <Upload {...upload_props} showUploadList={false}>
				    <Button>
				      <Icon type="upload" />上传资源
				    </Button>
				  </Upload>
				</div>
				<Table columns={columns}
			        rowKey={record => record.ID}
			        dataSource={this.state.data}
			        pagination={this.state.pagination}
			        loading={this.state.loading}
			        onChange={this.handleTableChange}
			      />
		    </div>
		);
	}
}

export default ResourceList;