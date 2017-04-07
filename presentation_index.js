import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Presentation from './Presentation.js';
function App() {

   var props={
   		userkey:"wxllzf",
   		create_url:"/Presentation/Create",
   		edit_url:"",
   		show_url:"",
   		...window.config
   }
   console.log(props);
    
    return(
			<Presentation  {...props}/>
	);

}

ReactDOM.render(<App />, document.getElementById('root'));