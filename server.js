/*
Gabriela Corona Garza
A01282529
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid');


const validateKey = require('./middleware/validate-bearer-token');
const jsonParser = bodyParser.json();

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

    let itemToUpdate = availablePosts.findIndex((post) => {
        if (post.id === id) {
            return true;
        }
    });

    if (itemToUpdate < 0) {
        res.statusMessage = "id wasn't found in the list";
        return res.status(400).end();
    }

    if (title != undefined) {
        availablePosts[itemToUpdate].title = title;
    }

    if (description != undefined) {
        availablePosts[itemToUpdate].description = description;
    }

    if (url != undefined) {
        availablePosts[itemToUpdate].url = url;
    }

    if (rating != undefined) {
        availablePosts[itemToUpdate].rating = rating;
    }
    
    return res.status(202).json(availablePosts[itemToUpdate]);

});

//deleting an existing bookmark with the id as a param
app.delete('/api/bookmark/:id', (req, res) => {
    let id = req.query.id;

    if (!id) {
        res.statusMessage = "please send the id to delete a bookmark";
        return res.status(406).end();
    }

    let itemToRemove = availablePosts.findIndex((post) => {
        if (post.id === id) {
            return true;
        }
    });


    if (itemToRemove < 0) {
        res.statusMessage = "id wasn't found in the list";
        return res.status(400).end();
    }
    //console.log(itemToRemove);

    //remove 1 element on that index
    availablePosts.splice(itemToRemove, 1);
    return res.status(204).end();

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
        return res.status(406).end(); //not accept status
    }

    let newBookmark = {
        id,
        title,
        description,
        url,
        rating
    };
    availablePosts.push(newBookmark);
    return res.status(201).json(newBookmark);
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
    let result = [];
    let instances = availablePosts.find((post) => {
        if (post.title == title) {
            // counter += 1;
            //return post;
            result.push(post);
        }
    });


    if (!result) {
        res.statusMessage = `no posts with the provided title 'title ? ${title}"`;
        return res.status(404).end();
    }

    return res.status(200).json(result);

});


//get all bookmarks
app.get('/api/bookmarks', (req, res) => {
    console.log("getting all bookmarks");
    return res.status(200).json(availablePosts);
});


app.listen(8080, () => {
    console.log("This server is running on port 8080");

});
//http://localhost:8080