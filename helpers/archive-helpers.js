var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var websites;

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
	// get websites from server
	fs.readFile(../archives/sites.txt, function(err, websites){
		if (err) {console.log("error in readListOfUrls")}
    cb(websites);
	})

};

exports.isUrlInList = function(targetUrl, cb){
  readListOfUrls(function(targetUrl, listOfWebsites){
  	listOfWebsites = listOfWebsites.split('\n');
  	cb(listOfWebsites.indexOf(targetUrl) !== -1);
  })

};

exports.addUrlToList = function(url){
	fs.appendFile('../archives/sites.txt', url+ '\n', function (err) {
	  if (err) {
	  	throw err;
	  }
	  console.log( url, ' was appended to the list of sites!');
	});
};

exports.isUrlArchived = function(url, cb){
	fs.exists("../archives/sites/"+url, function(doesExist){
		cb(doesExist);
	})
	///how's that name?
};

exports.downloadUrls = function(){

};
