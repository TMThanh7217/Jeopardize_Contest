const express = require('express')
const fs = require('fs')
const { get } = require('http')
var bodyParser = require('body-parser');
const app = express()
const port = 8000

// parse application/json 
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

let exprHbs = require("express-handleBars");
let hbs = exprHbs.create({
  extname : "hbs",
  defaultLayout : 'layout',
  layoutsDir : __dirname + '/views/layouts/',
  partialsDir : __dirname + '/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/:page', (req, res) => {
  let page = req.params.page;
  res.render(page);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})