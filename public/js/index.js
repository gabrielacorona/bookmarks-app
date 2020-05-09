const APIKEY = "2abbf7c3-245b-404f-9473-ade729ed4653";


//delete bookmark
function deleteBookmark(id) {
    let url = '/bookmark/' + id;
    let settings = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${APIKEY}`
        }
    }
    let results = document.querySelector('.results');
    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .catch(err => {
            results.innerHTML = `<div>${err.message}</div>`;
        });
}

//update bookmark
function updateBookmark(id, title, description, url, rating) {
    let updateURL = '/bookmark/' + id;
    let updated = {
        id: id,
        title: title,
        description: description,
        url: url,
        rating: Number(rating)
    }
    let settings = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${APIKEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updated)
    }
    let results = document.querySelector('.results');
    fetch(updateURL, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            results.innerHTML = "";
            console.log(responseJSON)
        })
        .catch(err => {
            results.innerHTML = `<div>${err.message}</div>`;
        });
}

//get by title
function getBookmarkByTitle(title) {
    let url = '/bookmark?title=' + title;

    let settings = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${APIKEY}`,
        }
    }
    let results = document.querySelector('.results');
    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            results.innerHTML = "";
            for (let i = 0; i < responseJSON.length; i++) {
                results.innerHTML += `<div>
                    <p>
                        ID: ${responseJSON[i].id}
                    </p>
                    <p>
                        Title : ${responseJSON[i].title}
                    </p>
                    <p>
                        Description : ${responseJSON[i].description}
                    </p>
                    <p>
                        URL : ${responseJSON[i].url}
                    </p>
                    <p>
                        Rating : ${responseJSON[i].rating}
                    </p>
                    <p>
                    ________________________________________
                    </p>
                </div>`;
            }
        })
        .catch(err => {
            results.innerHTML = `<div>${err.message}</div>`;
        });

}

//add a new bookmark
function addBookmarkFetch(title, description, url, rating) {
    let postUrl = '/bookmarks';
    let newBookmark = {
        title: title,
        description: description,
        url: url,
        rating: Number(rating)
    }

    let settings = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${APIKEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookmark)
    }

    let results = document.querySelector('.results');
    fetch(postUrl, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            results.innerHTML = "";
            console.log(responseJSON)
        })
        .catch(err => {
            results.innerHTML = `<div>${err.message}</div>`;
        });

}

//fetch all bookmarks
function fetchBookmarks() {
    let url = '/bookmarks';
    let settings = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${APIKEY}`
        }
    }
    let results = document.querySelector('.results');
    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            results.innerHTML = "";
            for (let i = 0; i < responseJSON.length; i++) {
                results.innerHTML += `<div>
                    <p>
                        ID: ${responseJSON[i].id}
                    </p>
                    <p>
                        Title : ${responseJSON[i].title}
                    </p>
                    <p>
                        Description : ${responseJSON[i].description}
                    </p>
                    <p>
                        URL : ${responseJSON[i].url}
                    </p>
                    <p>
                        Rating : ${responseJSON[i].rating}
                    </p>
                    <p>
                    ________________________________________
                    </p>
                </div>`;
            }
        })
        .catch(err => {
            results.innerHTML = `<div>${err.message}</div>`;
        });
}

//add bookmark
function watchAddBookmarkForm() {
    let bookmarksForm = document.querySelector('.add-bookmark-form');
    bookmarksForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let title = document.getElementById('bookmarkTitle').value
        let description = document.getElementById('bookmarkDes').value
        let url = document.getElementById('bookmarkUrl').value
        let rating = document.getElementById('bookmarkRating').value

        addBookmarkFetch(title, description, url, rating);
    })
}

//get all bookmarks
function watchBookmarksForm() {
    let bookmarksForm = document.querySelector('.bookmarks-form');

    bookmarksForm.addEventListener('submit', (event) => {
        event.preventDefault();
        fetchBookmarks();
    });
}

//delete bookmark
function watchDeleteBookmarkForm() {
    let bookmarksForm = document.querySelector('.delete-bookmark-form');
    bookmarksForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let id = document.getElementById('bookmarkID').value;
        deleteBookmark(id)
    })

}

//update bookmark
function watchUpdateBookmarkForm() {
    let bookmarksForm = document.querySelector('.update-bookmark-form');
    bookmarksForm.addEventListener('submit', (event) => {
        event.preventDefault();


        let id = document.getElementById('updateBookmarkID').value
        let title = document.getElementById('updateBookmarkTitle').value
        let description = document.getElementById('updateBookmarkDes').value
        let url = document.getElementById('updateBookmarkUrl').value
        let rating = document.getElementById('updateBookmarkRating').value
        updateBookmark(id, title, description, url, rating);

    })
}

//get bookmark by title
function watchGetBookmarkForm() {
    let bookmarksForm = document.querySelector('.get-bookmark-by-title-form');
    bookmarksForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let title = document.getElementById('getBookmarkTitle').value;
        getBookmarkByTitle(title)
    })
}

function init() {
    watchBookmarksForm();
    watchAddBookmarkForm();
    watchDeleteBookmarkForm();
    watchUpdateBookmarkForm();
    watchGetBookmarkForm();
}

init();