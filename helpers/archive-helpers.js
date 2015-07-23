var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var websites;

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'), /// maybe add /
  list: path.join(__dirname, '../archives/sites.txt'),
  main: path.join(__dirname, '../web/public/index.html'),
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(targetUrl, cb){
	fs.readFile(exports.paths.list, 'utf8', function(err, websites){
		if (err) {console.log("error in readListOfUrls")}
		console.log('websites', websites);
    cb(targetUrl, websites);
	});
};

exports.isUrlInList = function(targetUrl, cb){
  exports.readListOfUrls(targetUrl, function(targetUrl, listOfWebsites){
  	listOfWebsites = listOfWebsites.split('\n');
  	cb(listOfWebsites.indexOf(targetUrl) !== -1);
  });
};

exports.addUrlToList = function(targetUrl){
	fs.appendFile(exports.paths.list, targetUrl+ '\n', function (err) {
	  if (err) {
	  	throw err;
	  }
	  console.log( targetUrl, ' was appended to the list of sites!');
	});
};

exports.isUrlArchived = function(targetUrl, cb){
	fs.exists(exports.paths.archivedSites+targetUrl, function(doesExist){
		cb(doesExist);
	});
};

exports.downloadUrls = function(targetUrl){
	request(targetUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      fs.writeFile(targetUrl, body, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
			});
    }
  });
};
