# contact-manager
COP4331C Project #1

Clone the repo, install Node.js if you don't have it already, then run
`npm install`
`npm start`

Make commits to the corresponding branch: API, Database, or Frontend
Make pull requests into develop one a feature is complete

Trello:
https://trello.com/b/8aCPSavB/contact-manager

State Diagram:
https://drive.google.com/file/d/1fsCjt9x0OloRtdr2OfcnxroDHZBkDpQ5/view?usp=sharing


## Setting up the database

1. Importing the database, after making sure mongo is installed\
\
Starting from the root directory,
```
> cd backend
> mongoimport --db contact-manager --collection contacts -- file sample_data.json --jsonArray
```


2. Verify database\
\
Launch the MongoDB terminal by running
```
> mongo
```
Then, look at your databases, then collections, then call find on our new one
```
> show dbs
> use contact-manager
> show collections
> db.contacts.find()
```
The last line should show a few entries from the collection. If you see this, everything is set up!

## Testing the API endpoints

We're using axios to make ajax requests to the API in the application, but for testing use [Postman](https://www.getpostman.com/)

Example: get all contacts
![postman1](https://i.imgur.com/HDBKepK.png)

Create a new contact, note the json in the body
![postman2](https://i.imgur.com/zuR0VLM.png)

Get all contacts again, note the newly created one at the bottom
![postman3](https://i.imgur.com/I2EOAPf.png)
