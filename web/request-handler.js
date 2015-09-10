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
    if(routes[path]){
      httpHelpers.serveAssets(res, archive.paths.siteAssets + routes[path], 200);
    } else {
      httpHelpers.serveAssets(res, archive.paths.archivedSites + "/" + path, 200);
    }
  } 
  else if (req.method === 'POST' && path === "/") {
    var urlInput = "";
    
    req.on('data', function(chunk){
      urlInput += chunk;
    })
  
    req.on('end', function(){
      urlInput = urlInput.substr(4);

      archive.isUrlInList(urlInput)
      .then(function(inList){
        if(inList){
          archive.isUrlArchived(urlInput)
          .then(function(exists){
            if(exists){
              httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + urlInput, 200);
            }
          });
        } else {
          archive.addUrlToList(urlInput);
          httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', 302);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    });
  }
};
