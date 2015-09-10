var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var routes = {
    '/': '/index.html',
    '/styles.css': '/styles.css'
  };

  var path = url.parse(req.url).pathname;

  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, archive.paths.siteAssets + routes[path]);
  } else if (req.method === 'POST') {
    var urlInput = "";
    
    req.on('data', function(chunk){
      urlInput += chunk;
    })
    
    req.on('end', function(){
      archive.isUrlInList(urlInput, function(inList){
        if(inList){
          archive.isUrlArchived(urlInput, function(exists){
            if(exists){
              httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + urlInput);
            }
          });
        } else {
          archive.addUrlToList(urlInput.substr(4));
          httpHelpers.sendResponse(res, 302, '');
        }
      });
    });
  }

};
