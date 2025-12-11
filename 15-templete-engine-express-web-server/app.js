const express = require('express')
const app = express()
const port = 3000

const expressLayouts = require("express-ejs-layouts");

app.set('view engine', 'ejs');
app.use(expressLayouts);

const halaman = {
  index: "index",
  about: 'about',
}

app.get('/', (req, res) => {
  res.render("index", { 
    title: "Halaman Home",
    layout: "layouts/main-layout",
    currentPage: "home"
  });
});

app.get('/about', (req, res) => {
    res.render("about", { 
      layout: 'layouts/main-layout',
      title: "Halaman About",
      currentPage: "about"
    });
});

app.get('/contact', (req, res) => {
    res.render("contact", { 
      title: "Halaman Contact", 
      layout: "layouts/main-layout",
      currentPage: "contact"
    }); 
});

app.get('/user/:name/num/:id', (req, res) => {
  res.send(`ID: ${req.params.id} - Name : ${req.params.name}`);
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});