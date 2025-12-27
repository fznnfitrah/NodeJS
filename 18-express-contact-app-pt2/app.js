const express = require('express')
const app = express()
const port = 3000

const { loadContact, detailContact, addContact, findNama } = require('./utils/contacts');
const expressLayouts = require("express-ejs-layouts");
const { validationResult, body, check} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true}));


// Konfigurasi Flash / pesan singkat
app.use(cookieParser('secret'))
app.use(session({
  cookie: { maxAge : 60000 },
  secret: "secret",
  resave: true,
  saveUninitialized: true,
}))
app.use(flash());


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


app.get('/contact', (req, res) => {
  contacts = loadContact();

  res.render("contact", { 
    title: "Halaman Contact", 
    layout: "layouts/main-layout",
    currentPage: "contacts",
    contacts,
    msg: req.flash('msg')
  }); 
});


app.get('/contact/add', (req, res) => {
  
  res.render("add-contact", {
    title: "Halaman Tambah Contact",
    layout: "layouts/main-layout",  
    currentPage: "add",
    
  });
});

app.post('/contact', [
  body('nama').custom(async value => {
    const nama = await findNama(value);
    if(nama) {
      throw new Error('Nama sudah ada, sudah terdaftar');
    }
    return true;
  }),
  check('email', 'Nilai Email Tidak Valid').isEmail(),
  check('noHp', 'Nomer Handphone Tidak Valid').isMobilePhone('id-ID').escape(),
], (req, res) => {
  const result = validationResult(req);
  if(!result.isEmpty()) {
    res.render("add-contact", {
      title: "Halaman Tambah Contact",
      layout: "layouts/main-layout",
      currentPage: "add",
      errors: result.array()
    })
    // return res.send( {errors: result.array()} ) 
  } else {
    addContact(req.body);
    req.flash('msg', "Data Berhasil di tambahkan");
    res.redirect('/contact');
  }


})

app.get('/contact/:nama', (req, res) => {
  contact = detailContact(req.params.nama);

  res.render("detail", { 
    title: "Halaman Contact", 
    layout: "layouts/main-layout",
    currentPage: "detail",
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
  console.log(`Example app listening at http://localhost:3000/`);
});