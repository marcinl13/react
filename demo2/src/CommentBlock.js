import React from 'react'
import CommentDetails from './CommentDetails'
import ApprovalCard from './ApprovalCard'


const CommentBlock = props => {
  return (
    <div className="ui container comments card">
      <CommentDetails author={props.author} time={props.time} msg={props.msg}></CommentDetails>
      <ApprovalCard></ApprovalCard>
    </div>
  )
}

export default CommentBlock