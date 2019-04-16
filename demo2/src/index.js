import React from 'react';
import ReactDOM from 'react-dom';
import CommentBlock from './CommentBlock';

const App = () => {
  return (
    <div>
      <CommentBlock author="aga" time="20:00" msg="jasjkd"></CommentBlock>
      <CommentBlock author="aga2" time="20:00" msg="jasjkd"></CommentBlock>
      <CommentBlock author="aga3" time="20:00" msg="jasjkd"></CommentBlock>
    </div>
    )
}


ReactDOM.render(<App />, document.querySelector('#root'));
