let bodyParser = require('body-parser');
let express = require('express');
let app = express();
console.log("Hello world");

// this is for mounting body-parser for parsing of POST resquest
app.use( bodyParser.urlencoded({extended: false}));

// this is for make a simple log with request type , path and ip
app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// this is for answer root / with a file present in the arborescence of the project
app.get('/', function(req, res) {
  //res.send('Hello Express');
  var absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

// this is to specify to all routes to take in consideration this directory so on the client he will be able to load css js images etc...
var absolutePath = __dirname + '/public';
app.use('/public', express.static(absolutePath));

// after adding an environment secrets .env i access it and check  the value to return a result in json depending on the value of secret
app.get('/json', function(req, res) {
  //process.env.MESSAGE_STYLE
  const mySecret = process.env['MESSAGE_STYLE']
  if (mySecret === 'uppercase')
    res.json({ message: "HELLO JSON" });
  else
    res.json({ message: "Hello json" });
});


// making a middleware function chaining a final handler to makes two actions one time  
app.get('/now', function(req, res, next) {
  req.time = new Date();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

// identify a user using route or an element 
app.get('/:word/echo', function(req, res) {
  res.json({ echo: req.params.word });
});

// getting information from an url sent by post 

app.route('/name').get(function(req,res){
  res.json({name : req.query.first + ' ' + req.query.last});
}).post(function(req,res){
  res.json({name : req.body.first + ' ' + req.body.last});
}); // This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.

























module.exports = app;
