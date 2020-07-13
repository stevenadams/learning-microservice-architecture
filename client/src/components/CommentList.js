import React  from 'react'

export default ({ comments }) => {
    const renderedComments = Object.values(comments).map(comment => {

        let commentContent 
        
        switch(comment.status){
            case 'rejected':
                commentContent = 'Comment was rejected'
                break
            case 'approved':
                commentContent = comment.content
                break
            default:
                commentContent = 'Pending approval'
                break
        }

        return (
            <li
                key={comment.id}
            >
                {commentContent}
            </li>
        )
    })

    return (
        <div>
            <h5>{comments.length} comment(s)</h5>
            <ul>
                {renderedComments}
            </ul>
        </div>
    )
}