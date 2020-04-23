/*
Gabriela Corona Garza
A01282529
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid');

//const validateKey = require('./middleware/validate-bearer-token');
const jsonParser = bodyParser.json();

const app = express();
app.use(morgan('dev'));

// let post = [{
//     id: uuid.v4(),
//     title: string,
//     description: string,
//     url: string,
//     rating: number
// }]
let availablePosts = [
    {
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
        if: uuid.v4(),
        title: "tres",
        description: "esta canción está chida",
        url: "https://www.youtube.com/watch?v=LmApDbvNCXg",
        rating: 10
    }
];


//creating a middleware funtion to handle headers
function middleware(req, res, next) {
    req.test = {};
    req.test.message = "Adding something to the request";
    next();
}


app.use(middleware);
//app.use(validateKey);


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
        res.statusMessage = `no students with the provided title 'title ? ${title}"`;
        return res.status(404).end();
    }

    return res.status(200).json(result);

});


//get all bookmarks
app.get('/api/book', (req, res) => {
    console.log("getting all bookmarks");
    return res.status(200).json(availablePosts);
});


app.listen(8080, () => {
    console.log("This server is running on port 8080");

});
//http://localhost:8080