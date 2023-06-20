'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');


/*
const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Number, required: true },
});
*/


async function seed() {

  await Book.create({
    title: 'Cat in the Hat',
    description: 'Rude is a menace.',
    status: '5',
  });

  console.log('Cat in the Hat was added.');

  await Book.create({
    title: 'The Hobbit',
    description: 'Little man fights big dragon',
    status: '10',
  });

  console.log('The Hobbit was added.');

  await Book.create({
    title: 'The Hunt for Red October',
    description: 'Big submarine fights big submarine.',
    status: '8',
  });

  console.log('The Hunt for Red October');

  mongoose.disconnect();
}

seed();