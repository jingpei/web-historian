var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
var q = require('q');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
  var deferred = q.defer();

  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    if (err) {
      deferred.reject(err);
    } else {
      var urls = data.split('\n');
      deferred.resolve(urls);
    }
  });

  return deferred.promise;
};

exports.isUrlInList = function(url) {
  var deferred = q.defer();

  exports.readListOfUrls()
    .then(function(urls){
      deferred.resolve(_.contains(urls, url));
    })
    .catch(function(err){
      deferred.reject(err);
    });

  return deferred.promise;
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url + '\n', 'utf8', cb);
};

exports.isUrlArchived = function(url) {
  var deferred = q.defer();

  fs.stat(exports.paths.archivedSites + "/" + url, function(err, stats){
    if(err){
      deferred.resolve(false);
    }
    else if(stats.isFile()){
      deferred.resolve(true);
    }
  });

  return deferred.promise;
};

exports.downloadUrls = function(url) {
  fs.appendFile('/Users/student/Desktop/2015-08-web-historian/archives/cronLog.txt', '\nFile to download: ' + url);

  fs.writeFile(exports.paths.archivedSites + "/" + url, '', function(err){
    httpRequest.get(url, exports.paths.archivedSites + "/" + url, function(err){
    });
  });
};
