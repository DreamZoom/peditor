import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Editor from './Editor.js';

function App() {

	var props = {
		pageid:0,
		userkey: "wxllzf",
		save_url: "/Presentation/SavePageContent",
		get_url: "/Presentation/GetPageContent",
		return_url: "",
		...window.config
	}
	return(
		<Editor {...props} />
	);
}

ReactDOM.render(<App />, document.getElementById('root'));