'use strict'
const db = require('./data/db.js');
const dbex = new db("snow","completed");
console.log(dbex.save());
console.log(dbex.getAll());
