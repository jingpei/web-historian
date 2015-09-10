// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('/Users/student/Desktop/2015-08-web-historian/helpers/archive-helpers.js');
var _ = require('/Users/student/Desktop/2015-08-web-historian/node_modules/underscore/underscore.js');
var fs = require('fs');

var getDownloads = function(){
  fs.appendFile('/Users/student/Desktop/2015-08-web-historian/archives/cronLog.txt', '\nCron job running...');

  archive.readListOfUrls(function(urls) {
    _.each(urls, function(url) {
      archive.isUrlArchived(url, function(exists) {
        if (!exists) {
          archive.downloadUrls(url);
        }
      });
    });

  });
}

getDownloads();
