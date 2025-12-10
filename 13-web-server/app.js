const http = require('http');
const fs = require('fs');
const port = 3000;

const loadHtml = (path, res) => {
    fs.readFile(path, (error, data) => {
        if(error) {
            res.writeHead(404);
            res.write('Halaman tidak ditemukan');
        } else {
            res.write(data);
        }
        res.end();
    });
}

http
    .createServer((req, res) => {
        
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })

        const url = req.url;

        if (url === "/about") {
            loadHtml("./about.html", res);
        } else if( url == "/content") {
            loadHtml("./contact.html", res); 
        } else {
            loadHtml("./index.html", res);
        };

    })
    .listen(port, () => {
        console.log(`Server is lestening on port 3000`);
    });

