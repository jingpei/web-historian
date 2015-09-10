// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('/Users/student/Desktop/2015-08-web-historian/helpers/archive-helpers.js');
var _ = require('/Users/student/Desktop/2015-08-web-historian/node_modules/underscore/underscore.js');
var fs = require('fs');

var getDownloads = function(){
  fs.writeFile('/Users/student/Desktop/2015-08-web-historian/archives/cronLog.txt', 'Cron job running...');

  var sitesToArchive = [];

  archive.readListOfUrls(function(urls) {
    _.each(urls, function(url) {
      archive.isUrlArchived(url, function(exists) {
        if (!exists) {
          sitesToArchive.push(url);
          fs.appendFile('/Users/student/Desktop/2015-08-web-historian/archives/cronLog.txt', '\nTrying to archive...');
        }
      });
    });

    archive.downloadUrls(sitesToArchive);    
  });
}

getDownloads();
