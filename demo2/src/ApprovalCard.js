import React from 'react'
import faker from 'faker'


const ApprovalCard = () => {
  return (
    <div>
      <button className="ui button green basic">Approve</button>
      <button className="ui button red basic">Reject</button>
    </div>
  )
}

export default ApprovalCard