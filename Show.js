import React from 'react';
import Showing from './Showing.js';
import request from './request';
class Show extends React.Component {

	state = {
		data: null
	}
	
	handleLoad = () => {
		const that = this;
		request(this.props.get_url, {
			data: {
				id: this.props.pageid,
				key: this.props.userkey
			}
		}).then(function(response) {
			if(response.result) {
				console.log(response);
				const model = JSON.parse(response.data.content);

				that.setState({
					data: model
				});
				
			} else {
				
			}
		});
	}

	componentDidMount() {
		this.handleLoad();
	}

	render() {
		return(
			<Showing data={this.state.data} />
		)
	}
}

export default Show;