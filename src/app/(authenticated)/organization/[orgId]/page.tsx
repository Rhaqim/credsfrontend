import React from 'react'

const Organization = ({ params }: { params: { orgId: number } }) => {
  console.log(params)
  return (
    <div>Organization</div>
  )
}

export default Organization