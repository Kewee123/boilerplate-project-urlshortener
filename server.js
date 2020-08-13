'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const dns = require('dns');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);
mongoose.connect("mongodb+srv://userid:pw@cluster0.dohoh.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
/** this project needs to parse POST bodies **/
// you should mount the body-parser here


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});



app.post('/api/shorturl/new', function(req, res){
  console.log(req.body);
  var validUrl = function(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  
  if(!validUrl(req.body.url)){
    
    res.json({"error":"invalid URL"});
  } else {
     let newUrl = new URL(req.body.url);
     console.log(newUrl);
    
    dns.lookup(newUrl.hostname, (err, address)=>
      {
        if(err) 
          res.json({"error":"invalid URL"});
        else{
          res.json({"hello": "hello"})
        }
      }
    )
  }
})


  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});
