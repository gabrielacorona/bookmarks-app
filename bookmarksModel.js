const mongoose = require('mongoose');


const bookmarksColletionSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }

});


const bookmarksColletion = mongoose.model('bookmarks', bookmarksColletionSchema);

const Bookmarks = {
    createBookmark: function (newBookmark) { //insert into db new bookmark
        return bookmarksColletion
            .create(newBookmark)
            .then(createdBookmark => {
                return createdBookmark;
            })
            .catch(err => {
                return err;
            });
    },
    getAllBookmarks: function () {
        return bookmarksColletion
            .find()
            .then(allBookmarks => {
                return allBookmarks;
            })
            .catch(err => {
                return err;
            });
    },
    getByTitle: function (query) {
        return bookmarksColletion
            .find({
                title: query
            })
            .then(resultByTitle => {
                return resultByTitle
            })
            .catch(err => {
                return err;
            });
    },
    getById:function(query){
        return bookmarksColletion
            .find({
                id : query
            })
            .then(resultById =>{
                return resultById

            })
            .catch(err =>{
                return err;
            });
    },
    deletebyId: function (query) {
        return bookmarksColletion
            .deleteOne({
                id: query
            })
            .then(itemToDelete => {
                return itemToDelete
            })
            .catch(err => {
                return err;
            });
    },
    ///https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp
    patchbyId: function (query, title, description, url, rating) {
        return bookmarksColletion
            .updateOne({
                id: query
            }, {
                $set: {
                    id: query,
                    title: title,
                    description: description,
                    url: url,
                    rating: rating
                }
            })
            .then(updatedBookmark =>{
                return updatedBookmark
            })
            .catch(err =>{
                return err;
            });
    }
}




module.exports = {
    Bookmarks
};