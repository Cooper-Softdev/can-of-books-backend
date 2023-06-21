'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const Book = require('./models/books.js');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('/books', getBooks);

async function getBooks(request, response, next) {
  console.log('The request query', request.query)
  try {
    let allBooks = await Book.find({});
    response.status(200).send(allBooks);
  } catch (error) {
    next(error);
  }
}

app.post('/books', addBook);

async function addBook(request, response, next) {
  console.log(request.body);
  try {
    let addedBook = await Book.create(request.body);
    response.status(200).send(addedBook);
  } catch (error) {
    next(error);
  }
}

app.delete('/books/:bookID', deleteBook);

async function deleteBook(request, response, next) {
  console.log(request.params);
  try {
    let id = request.params.bookID;
    let book = await Book.findById(id);

    if (!book) {
      response.status(404).send('Book not found!');
      return;
    }

    const deletedBookTitle = book.title;
    await Book.findByIdAndDelete(id);

    response.status(200).send(`Book "${deletedBookTitle}" was deleted from the database`);
  } catch (error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});


