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
            .then(allBookmarks => {
                return allBookmarks
            })
            .catch(err => {
                return err;
            });
    },
    deletebyId: function (query) {
        return bookmarksColletion
            .deleteOne({
                id: query
            })
            .then(allBookmarks =>{
                return allBookmarks
            })
            .catch(err => {
                return err;
            });
    },
    patchbyId: function(query,title,description,url,rating){
        return bookmarksColletion
        .findOne({id:query},function(err,res){
            if(err){
                return err;
            }
            if(res === null){
                return res;
            }
            if(title){
                res.title = title;
            }
            if(description){
                res.description = description;
            }
            if(url){
                res.url = url;
            }
            if(rating){
                res.rating = Number(rating);
            }
            res.save().then(res=>{
                return res;
            })
            .catch(err =>{
                return err;
            })
        })
        .then(result =>{
            return result;
        })
        .catch(err=>{
            return err
        })
    }
}




module.exports = {
    Bookmarks
};