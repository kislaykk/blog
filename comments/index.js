const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostsId =  {};

app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostsId[req.params.id] || []);
});

app.post('/posts/:id/comments',(req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    console.log(`comment created =>${commentId}`);
    const comments = commentsByPostsId[req.params.id] || [] ; 
    const {content} = req.body;
    comments.push({
        id: commentId,
        content
    });
    commentsByPostsId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(4001,()=>{
    console.log('posts server running at 4001');
});
