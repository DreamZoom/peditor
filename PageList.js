import React from 'react';
import { Modal, Button, Icon, Switch } from 'antd';
import styles from './PageList.css';
import { sortable } from 'react-sortable';

console.log(styles);

class PageItem extends React.Component {

	render() {
		const { page,num,active,title } = this.props;
		return(	
				<div className="page_item" onClick={this.props.onClick}>
				  <span className={`page_item_num ${active?"page_item_num_active":""}`}><span className="page_item_num_em">{num}</span></span>
				  <span className={"page_item_title"}>{title||"页面"+num}</span>
				</div>		
		);
	}
}

class SortableItem extends React.Component {
	render() {
		return (
	      <div {...this.props} className="list-item">{this.props.children}</div>
	    )
	}
}
const SortablePageItem = sortable(SortableItem);

class PageList extends React.Component {

	state = {
		draggingIndex: null,
		data: this.props.list
	}

	updateState = (state) => {
		this.setState(state);
		if(this.props.onSortPage){
			this.props.onSortPage();
		}		
	}
	
	render() {
		const { selected_page_guid, pagelist, onNewPage, onSelectPage,onSortPage } = this.props;

		return(
			<div className="page_list">
			  {
			  	this.props.list.map((page,index)=>{			  		
				  	return (
				  		<SortablePageItem 
				  		    updateState={this.updateState}
				  		    draggingIndex={this.state.draggingIndex} 
				  		    key={index} 
				  		    sortId={index} 
				  		    items={this.state.data} outline="list">
				  		
				  			<PageItem onClick={()=>{onSelectPage(page)}}  page={page} active={(selected_page_guid==page.guid)} num={index+1} title={page.title}/> 
				  		</SortablePageItem>
				  	)
			  	})
			  }	
			  <div className="page_item" onClick={onNewPage}> <Icon type="plus" className="page_button_add" /> </div>
			</div>
		);
	}
}

export default PageList;