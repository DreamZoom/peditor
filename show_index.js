import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Show from './Show.js';

function App() {

	var props = {
		userkey: "wxllzf",		
		get_url: "/Presentation/GetPageContent",
		...window.config
	}
	return(
		<Show {...props} />
	);
}

ReactDOM.render(<App />, document.getElementById('root'));