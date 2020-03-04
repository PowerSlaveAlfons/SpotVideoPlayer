var fs = require('fs');
var request = require('request');
var open = require('open');

var apikey = fs.readFileSync('youtubeAPIkey.txt');
 
var opts = {
  maxResults: 10,
  key: apikey
};
 
function getVideo(title)
{
request.get(
  {
    url: "https://www.googleapis.com/youtube/v3/search",
    qs:{part: "snippet", key: apikey, q:title}
  },
  function getTrack(err, res) {
    var bod = JSON.parse(res.body);
    console.log(bod.items[0].id.videoId);
    var id = bod.items[0].id.videoId;
    return videoID;

  }
);
}

var vid = getVideo('in all deinen Farben');
//open('youtube.com');