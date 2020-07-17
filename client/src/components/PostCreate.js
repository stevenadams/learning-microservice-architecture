import React, { useState } from 'react'
import axios from 'axios'

export default () => {
    const [title, setTitle] = useState('')

    const onFormSubmit = async (evt) => {
        evt.preventDefault()

        await axios.post('http://posts-microservice.com/posts/create', {
            title
        })

        setTitle('')
    }

    return (
        <div>
            <h2>Create post</h2>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className="form-control" 
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}