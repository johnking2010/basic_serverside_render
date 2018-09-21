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

// respond to 'GET' request:
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + 'index.html'));
});

// Lists the path to the files... (boring)
app.get('/list', function(req, res) {
  //console.log('Path to HTML', path.join(__dirname + '/index.html'));
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

  // ES6:
  //files.then(files => { })
  //--
  // ES5
  files.then(function(files) {
    //console.log('\nListing ALL: ' + files.length +' files found: \n');
    //console.log(files);
    // ES6 style '=>' arrow function syntax
    //files.forEach(file => console.log('Found files: ', file));
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
      console.log('\n' + repeatedPathLength, 'chars long,' + ' repeated path: ' + repeatedPath);
      var shortPathLength = 0;
      longPathLength = file.length;
      cutPath = file.slice(0, repeatedPathLength); // 0, 52 - 1
      shortPath = file.slice(repeatedPathLength, longPathLength); // 52, end
      // *** THIS ONE:
      usefulRelPath = '.' + shortPath;
      // ***
      /*
      console.log('short path: ', shortPath, 'cutPath: ', cutPath, 'usefulRelPath: ', usefulRelPath);
      console.log('longPathLength:', longPathLength, 'repeatedPathLength: ', repeatedPathLength, 'diff : ', longPathLength - repeatedPathLength);
      var tempImageOutput = "<img src=" +'"'+ file +'"' + " style=" +'"'+ "width:auto;height:auto;" +'"'+ ">";
          console.log('tempImageOutput: ', tempImageOutput + '\n');
          console.log('Found files: ', file + '\n');
      */    

      return collectArray.push(usefulRelPath); // REL file path
    })
    // to DOM - just the top file path as text displayed...
    /*
    res.json(collectArray);
    res.send(collectArray);
    res.render('index', { data: JSON.stringify(collectArray) });
    */
    console.log('----\n');

    // DO ONCE !
    sendPathsOn(collectArray);
  });

  // png -
  //console.log('Listing .png \n----\n');
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('png')
    .find();
    //.ext IS case-sensitive...
  files.then(console.log);
  //

  /*
  // ES6 fat arrow func, resolving promise:
  .then(files => {
    //
    console.log('promise returning ? ' + files);
    files.forEach(file => console.log('Found File', file));
  });
  */

  // - JPG
  //console.log('Listing .JPG \n----\n');
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('JPG')
    .find();
  // files.then(console.log);

  // - jpg
  //console.log('Listing .jpg \n----\n');
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('jpg')
    .find();
  // files.then(console.log);
  //

  // - gif
  //console.log('Listing .gif \n----\n');
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('gif')
    .find();
  // files.then(console.log);
  //

  // - GIF
  //console.log('Listing .GIF \n----\n');
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('GIF')
    .find();
  // files.then(console.log);
  //
});

// FTP: (access via '/images' endpoint)
app.use('/images', express.static('public/images'), serveIndex('public/images', {'icons': true, 'view': 'tiles'}))
console.log('FTP Set Up - access via /images');
  /* Serve URLs like /ftp/thing as public/ftp/thing
  The express.static serves the file contents
  The serveIndex is this module serving the directory */

//instantiate server: usual way
app.listen(port, function() {
  console.log('Example app listening on port 3001');
});