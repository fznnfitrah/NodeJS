const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile("./index.html", { root: __dirname })
});

app.get('/about', (req, res) => {
    res.sendFile("./about.html", { root: __dirname })
});

app.get('/contact', (req, res) => {
    res.sendFile("./contact.html", { root: __dirname })
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




// const http = require('http');
// const fs = require('fs');
// const port = 3000;

// const loadHtml = (path, res) => {
//     fs.readFile(path, (error, data) => {
//         if(error) {
//             res.writeHead(404);
//             res.write('Halaman tidak ditemukan');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// }

// http
//     .createServer((req, res) => {
        
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         })

//         const url = req.url;

//         if (url === "/about") {
//             loadHtml("./about.html", res);
//         } else if( url == "/content") {
//             loadHtml("./contact.html", res); 
//         } else {
//             loadHtml("./index.html", res);
//         };

//     })
//     .listen(port, () => {
//         console.log(`Server is lestening on port 3000`);
//     });

