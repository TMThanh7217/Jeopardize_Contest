const express = require('express')
const fs = require('fs')
const { get } = require('http')
const product = require(__dirname + "/public/data.js");
const app = express()
const port = 8000



app.use(express.static(__dirname + "/public"));

let exprHbs = require("express-handlebars");
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

function getJarsAccount(salary) {
  let contribution = [0.55, 0.1, 0.05]
  let balance = []
  for (let cond of contribution) {
    balance.push((salary * cond).toFixed(2));
  }
  var jars = { necessity : balance[0], 
              financial : balance[1],
              give : balance[2],
              education : balance[1],
              saving : balance[1],
              play : balance[1] }
  return jars;
}

app.get('/:page', (req, res) => {
  let page = req.params.page;
  if (page == "task1") {
    let salary = 0;
    res.render(page, {jars: getJarsAccount(salary)})
  }
  else if (page == "task3") {
    console.log(product);

    console.log("Object: " + product.categories[0] + product.products[0]);
    res.render(page, {product: product.products});
  }
  else if (page == "task2") {
    res.render(page, {quote : product.quote[0]})
  }
  else {
    res.render(page);}
})

app.get('/task1/:salary', (req, res) => {
  let salary = Number(req.params.salary);
  res.render('task1', {jars: getJarsAccount(salary)});
})

app.get('/task3/:category', (req, res) => {
  let cate = req.params.category;
  let list = [];
  for (let prod of product.products) {
    if (prod.category == cate) {
      list.push(prod);
    }
  }
  res.render('task3', {product: list});
});

app.get('/task2/:emo', (req, res) => {
  let emo = req.params.emo;
  let quote = product.quote[0];
  for(let e of product.quote){
    console.log(e);
    if (e.title == emo)
      quote = e;
  }
  res.render('task2', {quote});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
