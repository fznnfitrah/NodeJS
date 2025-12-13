const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require("express-ejs-layouts");
const morgan = require('morgan')

app.set('view engine', 'ejs');

//ANCHOR - Third-Party Middleware
app.use(expressLayouts);
app.use(morgan('dev'))

const halaman = {
  index: "index",
  about: 'about',
}

//ANCHOR - Build-in Middleware
app.use(express.static('public'))



//ANCHOR - Application-Level Middleware 
//NOTE - Middleware Selalu dijalankan setiap ada request
app.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);
  next()
})

//NOTE - ini juga bisa disebut middlerware
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


//NOTE - Jadi Middleware ini juga bisa ditambahkan next()
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

//NOTE - Middleware Membaca dari atas kebawah jadi semisal diatase sudah bisa dijalankan, maka yang dibawah tidak dijalankan
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});