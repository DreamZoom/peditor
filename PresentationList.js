import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button, Modal, Input, Table } from 'antd';
import jquery from 'jquery';

class PresentationList extends React.Component {
	state = {
		data: [],
		pagination: {},
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
			...filters,
		});
	}
	fetch = (params = {}) => {
		const that = this;
		that.setState({ loading: true });
		jquery.ajax({
			url: 'http://localhost:6531/Presentation/List',
			method: 'get',
			data: {
				...params,
				key:that.props.userkey
			},
			dataType: "jsonp",
		}).then((response) => {
			const pagination = { ...that.state.pagination };
			// Read total count from server
			pagination.total = response.data.total;
			//pagination.total = 200;
			that.setState({
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
		const columns = [{
			title: '标题',
			dataIndex: 'Title',
			sorter: true
		}, {
			title: '描述',
			dataIndex: 'Description'
		}, {
			title: '访问次数',
			dataIndex: 'Visits'
		}, {
			title: '所有者',
			dataIndex: 'Owner'
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<div>
				<Button key={1} onClick={()=>{this.props.onEdit(record)}} >编辑</Button>
				<Button key={2} onClick={()=>{this.props.onShow(record)}} >查看</Button>
				</div>
			),
		}];
		return(
			<Table columns={columns}
		        rowKey={record => record.ID}
		        dataSource={this.state.data}
		        pagination={this.state.pagination}
		        loading={this.state.loading}
		        onChange={this.handleTableChange}
		      />
		)
	}
}

export default PresentationList;