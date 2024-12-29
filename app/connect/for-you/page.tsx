import React from 'react'
import Post from '../components/Post'

import PostObj from '../mockData/postMockData'

const Connect_ForYou = () => {
  return (
    <div>
      <Post postObj={PostObj} />
    </div>
  )
}

export default Connect_ForYou