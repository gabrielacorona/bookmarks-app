/*
Gabriela Corona Garza
A01282529
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid');
const mongoose = require('mongoose');


 
const validateKey = require('./middleware/validate-bearer-token');
const jsonParser = bodyParser.json();
const {Bookmarks} = require('./bookmarksModel');

const app = express();

app.use(morgan('dev'));
app.use(validateKey);

// let post = [{
//     id: uuid.v4(),
//     title: string,
//     description: string,
//     url: string,
//     rating: number
// }]

let availablePosts = [{
        id: uuid.v4(),
        title: "uno",
        description: "Este video voy a verlo cuando acabe mi tarea",
        url: "https://www.youtube.com/watch?v=VyngfQuzD3o",
        rating: 8
    }, {
        id: uuid.v4(),
        title: "uno",
        description: "Este video voy a verlo mañana en la tarde",
        url: "https://www.youtube.com/watch?v=mPVDGOVjRQ0",
        rating: 10
    },
    {
        id: uuid.v4(),
        title: "tres",
        description: "esta canción está chida",
        url: "https://www.youtube.com/watch?v=LmApDbvNCXg",
        rating: 10
    }
];

//updating an existing bookmark with id as a param
app.patch('/bookmark/:id', jsonParser, (req, res) => {
    let bodyId = req.body.id;
    let paramsId = req.params.id;
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let rating = req.body.rating;

    if (!bodyId || !paramsId) {
        res.statusMessage = "Missing Body Id or Params Id, verify query"
        return res.status(406).end();
    }

    if (bodyId != paramsId) {
        res.statusMessage = "The body Id and the params id is different";
        return res.status(409).end()
    }


    Bookmarks.patchbyId(bodyId,title,description,url,rating)
        .then(itemToUpdate =>{
            if(itemToUpdate){
                res.statusMessage = "post updated";
                return res.status(202).end();

            }
            else{
                res.statusMessage = "id wasn't found in the list";
                return res.status(400).end();
            }
        })
        .catch(err=>{
            res.statusMessage = "Something went wrong. Try again later.";
            return res.status(500).end();
        })

   

});

//deleting an existing bookmark with the id as a param
app.delete('/api/bookmark/:id', (req, res) => {
    let id = req.query.id;

});


//creating a new bookmark
app.post('/api/bookmarks', jsonParser, (req, res) => {
    console.log('adding new bookmark to the list.');
    console.log('body', req.body);

    let id = uuid.v4();
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let rating = req.body.rating;

    if (!title || !description || !url || !rating) {
        res.statusMessage = "missing param";
        console.log(req.body.title);
        return res.status(406).end(); //not accept status
    }

    let newBookmark = {
        id,
        title,
        description,
        url,
        rating
    };

    Bookmarks
        .createBookmark(newBookmark)
        .then( result =>{
            return res.status(201).json(result);
        })  
        .catch(err =>{
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        })

});

//geting bookmarks by title
app.get('/api/bookmark', (req, res) => {
    console.log("getting post by title");

    console.log(req.query);

    let title = req.query.title;

    if (!title) {
        res.statusMessage = "please send 'title' as param"
        return res.status(406).end(); //not accept status
    }

    //loop
    Bookmarks.getByTitle(title)
        .then(post =>{
            if(!post){
                res.statusMessage = `no posts with the provided title 'title ? ${title}"`;
                return res.status(404).end();           
            }
            else{
                return res.status(200).json(post);
            }
        })
        .catch(err =>{
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});


//get all bookmarks
app.get('/api/bookmarks', (req, res) => {
    console.log("getting all bookmarks");
    Bookmarks
        .getAllBookmarks()
        .then (result =>{
            return res.status(200).json(result);
        })
        .catch(err =>{
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        }); 
});


app.listen(8080, () => {
    console.log("This server is running on port 8080");

    new Promise((resolve,reject) =>{
        mongoose.connect('mongodb://localhost/bookmarksdb',{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
            if(err){
                reject(err);
            }
            else{
                console.log('bookmarks database connected successfully');
                return resolve();
            }
        });
    })
    .catch(err =>{
        mongoose.disconnect();
        console.log(err);
    })
});
//http://localhost:8080