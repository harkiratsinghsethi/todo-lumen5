
//
// const express = require("express")
// let app = express()
// app.get('/', (req, res) => res.send("HELLO FROM EXPRESS"));
// app.use(express.static('public'))
// app.listen(3000, () => console.log("Example app listening on port 3000!"));



const path = require('path');

let express = require('express');

bodyParser = require('body-parser');

app = express();
app.use(express.static('public'))


port = process.env.PORT || 8080;

let api = require('./src/server/routes/routes');
const indexRoute = require('./src/server/routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);
app.use('/', indexRoute);

app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.listen(port);

console.log('RESTful API server started on: ' + port);
