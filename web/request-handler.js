var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var url = require('url');
// var staticFile = require('node-static');
// require more modules/folders here!

// var fileServer = new staticFile.Server('./public');

exports.handleRequest = function (req, res) {
  var routes = {
    '/': '/index.html',
    '/styles.css': '/styles.css'
  };

  var path = url.parse(req.url).pathname;

  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, archive.paths.siteAssets + routes[path]);
  } else if (req.method === 'POST') {

  }
};
