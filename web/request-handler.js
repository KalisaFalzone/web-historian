var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);

  var getSite = function (targetUrl){
  	//check if it is in the list
  	archive.isUrlInList(targetUrl, function(isInList){
      //if so
      //determine if website is archived
      if (isInList){
        archive.isUrlArchived(targetUrl, fuction(isArchived){
        	if(isArchived){
      //if yes then redirect to archived website
        	} else {
      //if not direct to loading
        	}
        })
      } else {
  	    archive.addUrlToList(targetUrl)
  	///// redirect to loading page

      }
  	})

  }

  var sendSite = function(){

  }

};

