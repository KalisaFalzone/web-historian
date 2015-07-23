// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var handler = require("../web/request-handler");
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');


archive.readListOfUrls('', function(websites){
  _.each(websites, function(site){
  	archive.downloadUrls(site);
  })
});
