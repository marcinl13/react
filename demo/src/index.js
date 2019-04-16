//import react reactDOM

import React from 'react';
import ReactDOM from 'react-dom';

function writeText(){
  return 'writeText'
}

//create component
const App = () => {
  const buttonText = "OK"
  return (
    <div>
      <label className="panel" htmlFor="name">Name</label>
      <input id="name" type="text"></input>
      <button style={{backgroundColor : 'blue', color : 'white'}}>{buttonText} {writeText()}</button>
    </div>
    )
}


// rendering
ReactDOM.render( <App/>, document.querySelector('#root') )
