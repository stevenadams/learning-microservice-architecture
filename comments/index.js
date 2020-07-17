const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')


const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body

  const comments = commentsByPostId[req.params.id] || []

  const newComment = {
    id: commentId, 
    content,
    postId: req.params.id,
    status: 'pending',
  }

  comments.push(newComment)

  commentsByPostId[req.params.id] = comments

  await axios.post('http://event-broker-srv:4005/events', {
    type: 'CommentCreated',
    data:  newComment,
  })

  res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  if (type === 'CommentModerated') {
    
    const comment = commentsByPostId[data.postId].find((comment) => {
      return comment.id === data.id
    })

    comment.status = data.status

    await axios.post('http://event-broker-srv:4005/events', {
      type: 'CommentUpdated',
      data,
    })
  }

  res.send({})
})

app.listen(4001, () => {
    console.log('Listening on port 4001')
})