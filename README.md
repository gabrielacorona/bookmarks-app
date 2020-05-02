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
#### 3.3. db.nameofdbinplural.fins()
see collections stored in the db

