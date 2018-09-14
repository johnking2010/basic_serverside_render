
// node + express - basic server
var path = require('path');
var fs = require('fs');
var express = require('express');
var serveIndex = require('serve-index');
var filehound = require('filehound');

var app = express();

// make static files available: (ie - index.html)
app.use(express.static('public'));


// respond to 'GET' request:
app.get('/', function(req, res){
  //
  res.sendFile(path.join(__dirname + 'index.html'));

});

app.get('/button', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/buttonPage.html'));
});

// Lists the path to the files... boring
app.get('/list', function(req, res) {
  //res.sendFile(path.join(__dirname + 'index.html'));
  //res.send(path.join(__dirname + '/public/images'));
  console.log('got past the text send from express');

// to store correct paths for sending client-side:
  var collectArray = [];


  // - To send TO the DOM!!!
  var sendPathsOn = function(arrayOfPaths) {
	   res.send(arrayOfPaths);
  };

  // ALL FILES - perhaps not a great idea
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    //.ext('png')
    .find();
    //.ext IS case-sensitive...

  // ES6:
  //files.then(files => {
  // ES5
   files.then(function(files) {
    	console.log('Listing ALL: ' + files.length +' files found - no extension provided:');
    	console.log(files);

    	// ES6 style '=>' arrow function syntax
    	//files.forEach(file => console.log('Found files: ', file));
    	// ES5 style:
    	files.forEach(function(file) {
      		var collectObject = {};
      		collectObject.file = file;

      	var cutPath = '';
      	var shortPath = '';
      	var longPathLength = 0;
      	var repeatedPathLength = '/Users/j/Repos/loadImages/public/'.length;
        console.log(repeatedPathLength, 'chars long');
      	//var repeatedPathLength = '........testLoadImages/public/'.length;

       var shortPathLength = 0;

      	longPathLength = file.length;
      	cutPath = file.slice(0, repeatedPathLength-1); // 0, 52 - 1
      	shortPath = file.slice(repeatedPathLength, longPathLength); // 52, end
      	// *** THIS ONE:
      	usefulRelPath = './' + shortPath
      	// ***
      	console.log('short path: ', shortPath, 'cutPath: ', cutPath, 'usefulRelPath: ', usefulRelPath);
      	console.log('longPathLength:', longPathLength, 'repeatedPathLength: ', repeatedPathLength, 'diff : ', longPathLength - repeatedPathLength);
      	var tempImageOutput = "<img src=" +'"'+ file +'"' + " style=" +'"'+ "width:auto;height:auto;" +'"'+ ">";
            console.log('tempImageOutput: ', tempImageOutput + '\n');
            console.log('Found files: ', file + '\n');

      	return collectArray.push(usefulRelPath); // REL file path
    	})
    	// to DOM - just the top file path as text displayed...
    	//res.json(collectArray);


    	//res.send(collectArray);
    	//
    	//res.render('index', { data: JSON.stringify(collectArray) });

    	console.log('----\n');
    	//return collectArray.length

      // DO ONCE ?
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


  // .then(files => {
  //   //
  //   console.log('promise returning ? ' + files);
  //   files.forEach(file => console.log('Found File', file));
  // });

  // - JPG
  //console.log('Listing .JPG \n----\n');
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('JPG')
    .find();
  files.then(console.log);
 //


  // - jpg
  //console.log('Listing .jpg \n----\n');
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('jpg')
    .find();
  files.then(console.log);
  //


  // - gif
  //console.log('Listing .gif \n----\n');
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('gif')
    .find();
  files.then(console.log);
  //


  // - GIF
  //console.log('Listing .GIF \n----\n');
  var files = filehound.create()
    .paths(path.join(__dirname + '/public/images/'))
    .ext('GIF')
    .find();
  files.then(console.log);
  //



});


// FTP:
app.use('/images', express.static('public/images'), serveIndex('public/images', {'icons': true, 'view': 'tiles'}))
console.log('FTP Set Up');
// Serve URLs like /ftp/thing as public/ftp/thing
// The express.static serves the file contents
// The serveIndex is this module serving the directory





//instantiate server: usual way
app.listen(3001, function() {
     console.log('Example app listening on port 3001');
});




// direct DOM:
//var tempImageOutput = document.createElement("IMG");
//tempImageOutput.width('auto').height('auto').alt('image to be loaded').src(file);


// create element of HTML:
//var myImage = document.createElement("IMG");
//myImage.src(file);


// var tempImageOutput = $("<img>")
//   .alt("HTML5 Icon")
//   .style("width:auto;height:auto;")
//   .src(file);
// src=file alt="HTML5 Icon" style="width:auto;height:auto;">>").
// collectArray.push(tempImageOutput);

// $('<h1>Hello you bastard is this working yet</h1>').appendTo('body');
// // The below WORKED once! jquery in Node JS - via 'jsdom' npm package
// console.log($('h1').text());
