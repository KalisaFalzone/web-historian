var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require('request');
var url = require('url');
var http = require('http');
var fs = require('fs');


// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.main);
  var headers = defaultCorsHeaders;
  var urlpath = url.parse(req.url).pathname;
  var contentType = 'text/html'
  var route = path.join(__dirname, urlpath);


	var goToSite = function(url,contentType) {
    fs.readFile(url, function(err, content) {
      headers['Content-Type'] = contentType;
      if (err) {
        res.writeHead(404, headers);
        res.end('404');
        return;
      }
      res.writeHead(200, headers);
      res.end(content);
    });
  }

  if (path.extname(req.url) === '.css') {
  	route = archive.paths.siteAssets+'/styles.css';
  	contentType = 'text/css';
  } else if (urlpath === '/') {
	  route = archive.paths.main
  }

  var handleInput = function (targetUrl){
    //check if it is in the list
    archive.isUrlInList(targetUrl, function(isInList){
      //if so
      if (isInList){
        archive.isUrlArchived(targetUrl, function(isArchived){
          if(isArchived){
            console.log(archive.paths.archivedSites+ '/'+ targetUrl);
            goToSite(archive.paths.archivedSites+ '/'+ targetUrl, 'html'); //?
          } else {
            goToSite(archive.paths.siteAssets+ "/loading.html", 'html');
          }
        })
      } else {
        archive.addUrlToList(targetUrl)
        goToSite(archive.paths.siteAssets+ "/loading.html", 'html');
      }
    })
  }

	if(req.method === "GET")  { goToSite(route, contentType) }
	if(req.method === "POST") {
    var data='';
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      handleInput(data.slice(4));
    });
  }

};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
