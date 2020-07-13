import React, { useState } from 'react'
import axios from 'axios'

export default ({ postId }) => {
    const [content, setContent] = useState('')

    const onFormSubmit = async (evt) => {
        evt.preventDefault()

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        })

        setContent('')
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label>New comment</label>
                    <input 
                        value={content} 
                        onChange={e => setContent(e.target.value)} 
                        className="form-control" 
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}