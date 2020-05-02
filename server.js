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
const {
    Bookmarks
} = require('./bookmarksModel');

const app = express();

app.use(morgan('dev'));
app.use(validateKey);

// let post = [{
//     id: uuid.v4(), --> string
//     title: string,
//     description: string,
//     url: string,
//     rating: number
// }]

//updating an existing bookmark with id as a param
app.patch('/bookmark/:id', jsonParser, (req, res) => {

    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let rating = req.body.rating;

    let id = req.params.id

    if (!id) {
        res.statusMessage = "Missing ID, verify query"
        return res.status(406).end();
    }

    Bookmarks
        .getById(id)
        .then(itemToUpdate => {
            if (!itemToUpdate.length === 0) {
                res.statusMessage = "Id not found";
                return res.status(404).end();
            } else {
                //console.log(itemToUpdate, itemToUpdate.title)
                if(!title){
                    title = itemToUpdate[0].title;
                }
                if(!description){
                    description = itemToUpdate[0].description;
                }
                if(!url){
                    url = itemToUpdate[0].url;
                }
                if(!rating){
                    itemToUpdate[0].rating;
                }
                let newvals = {title,description,url,rating};
                Bookmarks
                    .patchbyId(id, newvals)
                    .then(result => {
                        Bookmarks
                            .getById(id)
                            .then(result =>{
                                return res.status(200).end().json(result);
                            })
                            .catch(err =>{
                                res.statusMessage = "Something went wrong with the DB. Try again later.";
                                return res.status(500).end();
                            })
                        //res.statusMessage = "successfully updated"
                        
                    })
                    .catch(err => {
                        res.statusMessage = "Something went wrong with the DB. Try again later.";
                        return res.status(500).end();
                    });
                
                }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });

});

//deleting an existing bookmark with the id as a param
app.delete('/bookmark/:id', (req, res) => {
    let id = req.params.id;
    Bookmarks
        .getById(id)
        .then(itemToRemove => {
            if (!itemToRemove) {
                res.statusMessage = "Id not found";
                return res.status(404).end();
            } else {
                Bookmarks
                    .deletebyId(id)
                    .then(result => {
                        res.statusMessage = "successfully deleted"
                        return res.status(200).end();
                    })
                    .catch(err => {
                        res.statusMessage = "Something went wrong with the DB. Try again later.";
                        return res.status(500).end();
                    });
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

//creating a new bookmark
app.post('/bookmarks', jsonParser, (req, res) => {
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
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        })

});

//geting bookmarks by title
app.get('/bookmark', (req, res) => {
    console.log("getting post by title");


    let title = req.query.title;
    console.log(!title);

    if (!title) {
        res.statusMessage = "please send 'title' as param"
        return res.status(406).end(); //not accept status
    }

    //loop
    Bookmarks
        .getByTitle(title)
        .then(post => {
            //console.log(post.length)
            if (post.length === 0) {
                console.log(post)
                res.statusMessage = `no posts with the provided title 'title ? ${title}"`;
                return res.status(404).end();
            } else {
                return res.status(200).json(post);
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});


//get all bookmarks
app.get('/bookmarks', (req, res) => {
    console.log("getting all bookmarks");
    Bookmarks
        .getAllBookmarks()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});


app.listen(8080, () => {
    console.log("This server is running on port 8080");

    new Promise((resolve, reject) => {
            mongoose.connect('mongodb://localhost/bookmarksdb', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('bookmarks database connected successfully');
                    return resolve();
                }
            });
        })
        .catch(err => {
            mongoose.disconnect();
            console.log(err);
        })
});
//http://localhost:8080