# Lab 7 Bookmarks App using nodejs server
____

## Steps to inicialize and setup Nodejs server:

### 1. run npm init to initialize the local server
Fill in wth the information asked by the command prompt

### 2. run npm install (name of dependency) to add dependencies to the package.json
ie: npm install morgan,express,uuid,nodemon,body-parser

### 3. make sure to add the .gitignore before pushing to the repository
This way the github repo will exclude the node_modules and package_lock.json  which are not necesarily needed to run the server.


## Steps to set up mongo for debugging:

### 1. run brew services start mongodb-community in terminal
if mongo is already running then run brew services restart mongodb-community

### 2. run mongo
This starts the mongo environment

### 3. Commands:
#### 3.1. show dbs
check which dbs are already inicialized in the environment
#### 3.2. use nameofdbinpluraldb
select the db where the operations should be run
#### 3.3. db.nameofdbinplural.find()
see collections stored in the db

## Steps deploy in heroku:

### 1. create new collection in the free cluster
if you try to add a new cluster you will get billed, make sure to use free tier.
The database name should be called databaseNamedb ex: bookmarksdb
The collection name should be called collectionName ex: bookmarks

### 2. On the Database Access tab
Add a new database user with a username and password. Make sure to select read and write to any database so you can work with it.

### 3. On the Network Access tab 
Add a ip whitelist entry which allows any address:
0.0.0.0/0

### 4. Get the url from atlas to connect to the DB
On the sandbox click connect/connect your application and copy the connection string that is displayed.


Edit the link given where <user>:<password> are substituted by the settings that were previously defined in the database access tab

replace the test attribute from mongodb.net/test where test is thename of your database

original link:
mongodb+srv://<username>:<password>@cluster0-yw1jj.mongodb.net/test?retryWrites=true&w=majority

example of url after config:
mongodb+srv://admin:admin1@cluster0-yw1jj.mongodb.net/bookmarksdb?retryWrites=true&w=majority


### 5. Add a config.js file 
Here you will add a configuration to protect your information. Here you can add the database url as well as the api token.
The synthax is:
exports.NAMEOFVARIABLE = process.env.NAMEOFVARIABLE || 'value'
where the value is the url or the value that you want to hide

example:
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/bookmarksdb'
exports.API_KEY = process.env.API_KEY || '12345'


after doing that add constants to where these variables should be used example:
const {
    DATABASE_URL
} = require('./config');

and substitute the places where these values should be used for the name of the constant. Make sure to use the same names as in the config file or it will not work.
Try making calls through postman to see if everything works
### 6. Connect to the ATLAS Cluster
After debugging, you will replace process.env.DATABASE_URL  with the atlas url





