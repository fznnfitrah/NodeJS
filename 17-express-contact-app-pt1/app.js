const express = require('express')
const app = express()
const port = 3000

const { loadContact, detailContact } = require('./utils/contacts');

const expressLayouts = require("express-ejs-layouts");
app.set('view engine', 'ejs');

app.use(expressLayouts);

const halaman = {
  index: "index",
  about: 'about',
}


app.use(express.static('public'))


app.get('/', (req, res) => {
    const mahasiswa = [
    {
      nama: "fitrah",
      email: 'fitrah@gmail.com',
    },
    {
      nama: "alifiya",
      email: 'alifiya@yahoo.com',
    },
    {
      nama: 'hilman',
      email: 'hilamn@outlook.com'
    }
  ]

  res.render("index", { 
    title: "Halaman Home",
    layout: "layouts/main-layout",
    currentPage: "home",
    mahasiswa
  });
});


app.get('/about', (req, res) => {
    res.render("about", { 
      layout: 'layouts/main-layout',
      title: "Halaman About",
      currentPage: "about"
    });
});


app.get('/contacts', (req, res) => {
  contacts = loadContact();

  res.render("contacts", { 
    title: "Halaman Contact", 
    layout: "layouts/main-layout",
    currentPage: "contacts",
    contacts
  }); 
});

app.get('/contact/:nama', (req, res) => {
  contact = detailContact(req.params.nama);

  res.render("contact", { 
    title: "Halaman Contact", 
    layout: "layouts/main-layout",
    currentPage: "contact",
    contact
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