// node + express - basic server
var path = require('path');
var fs = require('fs');
var express = require('express');
var serveIndex = require('serve-index');
var filehound = require('filehound');

var app = express();
var port = process.env.PORT || 3001;

// make static files available: (ie - index.html)
app.use(express.static('public'));

// respond to GET request - serve HTML:
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + 'index.html'));
});

// Lists the path to the files... (boring)
app.get('/list', function(req, res) {
  // to store correct paths for sending client-side:
  var collectArray = [];
  // - function to send TO the DOM!!!
  var sendPathsOn = function(arrayOfPaths) {
	  res.send(arrayOfPaths);
  };

  // only .jpg files (.ext IS case-sensitive...):
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('.jpg')
    .find();

  // ES5
  files.then(function(files) {
    /* 
    ES6 style '=>' arrow function syntax:
    files.forEach(file => console.log('Found files: ', file)); 
    */
    //---
    // ES5 style:
    files.forEach(function(file) {
      var collectObject = {};
      collectObject.file = file;

      var cutPath = '';
      var shortPath = '';
      var longPathLength = 0;
      var repeatedPath = __dirname + '/public';
      var repeatedPathLength = repeatedPath.length;

      var shortPathLength = 0;
      longPathLength = file.length;
      cutPath = file.slice(0, repeatedPathLength); // 0, 52 - 1
      shortPath = file.slice(repeatedPathLength, longPathLength); // 52, end
      // useful:
      usefulRelPath = '.' + shortPath;  
      // relative file path:
      return collectArray.push(usefulRelPath); 
    })
    // to DOM - just the top file path as text displayed...
    /*
    res.json(collectArray);
    res.send(collectArray);
    res.render('index', { data: JSON.stringify(collectArray) });
    */
    // DO ONCE !
    sendPathsOn(collectArray);
  });
});

// FTP: (access via '/images' endpoint)
app.use('/images', express.static('public/images'), serveIndex('public/images', {'icons': true, 'view': 'tiles'}))
console.log('FTP Set Up - access via /images');
/* 
Serve URLs like /ftp/thing as public/ftp/thing
  The express.static serves the file contents
  The serveIndex is this module serving the directory 
*/

// Instantiate server:
app.listen(port, function() {
  console.log('Example app listening on port 3001');
});