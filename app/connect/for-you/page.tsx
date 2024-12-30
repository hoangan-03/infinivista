import React from 'react'
import Post from '../components/Post'

import PostObj from '../mockData/postMockData'

const Connect_ForYou = () => {
  return (
    // <div className='h-[calc(100vh-4.125rem)] px-10 -mx-10 py-5 -my-5 flex flex-col gap-7 overflow-auto'>
    <div className='flex flex-col gap-7'>
      <Post postObj={PostObj} />
      <Post postObj={PostObj} />
      <Post postObj={PostObj} />
    </div>
  )
}

export default Connect_ForYou