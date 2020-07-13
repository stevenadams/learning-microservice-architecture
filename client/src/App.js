import React from 'react'
import PostCreate from './components/PostCreate'
import PostList from './components/PostList'

export default () => {
    return (
        <div className="container"> 
            <h1>Blog app</h1>
            <PostCreate />
            <hr />
            <PostList />
        </div>
    )
}