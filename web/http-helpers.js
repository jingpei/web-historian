var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(res, statusCode, data) {
  res.writeHead(statusCode, exports.headers);
  res.end(data);
};

exports.serveAssets = function(res, asset, statusCode, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(asset, function(err, data){
    if(err){
      exports.sendResponse(res, 404, JSON.stringify(err));
      return;
    } else {
      exports.sendResponse(res, statusCode, data)
    }
  })
};
