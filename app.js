const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 5000;

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/',function(req, res){
    res.send('/public/index.html');
})

app.get('/save/:time', function(req, res){
    console.log(req.params.time);
    res.send('done');
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));