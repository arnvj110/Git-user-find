import React from 'react'
import './info.css'
const Info = ({data,num}) => {
  return (
    <div className='info'>
      <h2>Repo {num}</h2>
      <p><strong>Name</strong> : {data.name}</p>
      <p><strong>Url</strong> : {data.svn_url}</p>
      <p><strong>Description</strong> : {data.description || 'No description available'}</p>
    </div>
  )
}

export default Info
