# London App Brewery - Todo List

This is a solution to the [Todo List](https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12384810) challenge on [Udemy](https://www.udemy.com/course/the-complete-web-development-bootcamp/).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [How to install and run](#how-to-install-and-run)
- [Author](#author)

## Overview

### The challenge

"Learn the basics of working with EJS templates and MongoDB database operations by building your own Todo List web app."

### Screenshot

![Screenshot](./thumbnail.png)

### Links

- Code URL: [Github](https://github.com/cekstedt/LAB-Todo-List)
- Live Site URL: [Render](https://todo-list-7ih3.onrender.com/)
- Challenge URL: [Udemy](https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12384810)

## My process

### Built with

- NodeJS
- Express
- MongoDB
- Mongoose
- EJS

### How to install and run

Make sure you have node.js installed.
```
node -v
```

Clone into the repo.
```
git clone https://github.com/cekstedt/LAB-Todo-List
```

Navigate into the root project folder and install dependencies.
```
cd LAB-Todo-List/
npm install
```

Create a `.env` file and add a `MONGO_URI='insert_variable_here'` variable to it. Its value should be your MongoDB database URI, which will take one of the following two forms:

> #### Local MongoDB Cluster
>
> Make sure you have [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed.
> 
> Start a second terminal session, and run the command `mongod`.
> 
> Now set your `MONGO_URI` variable in your `.env` file to `mongodb://localhost:27017/{database-name}`.

**- OR -**

> #### MongoDB Atlas Cluster
> 
> Follow [this tutorial](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/) to set up a hosted database on MongoDB Atlas if you haven't already.
> 
> Now set your `MONGO_URI` variable in your `.env` file to `mongodb+srv://{username}:{password}@{mongoDB-subdomain}.mongodb.net`.
> 
> To find your actual connection string:
> - Navigate to your [Atlas Account](www.mongodb.com)
> - Select your database cluster
> - Select the "Connect" button
> - Select the "Connect to you application > Drivers" tab
> - This will provide more specific instructions for connecting to your database from your app, including the connection string.

Lastly, run the command `npm run start` to start the server, then navigate to http://localhost:3000/ (when developing locally).

## Author

- [@cekstedt](https://github.com/cekstedt)
