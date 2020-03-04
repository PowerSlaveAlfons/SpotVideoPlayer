var request = require("request"); // "Request" library
var fs = require("fs");
require('dotenv').config();


var access_token ='';
var refresh_token = process.env.refresh_token;
var LastSongName = "";

clientid = process.env.clientid;
clientsecret = process.env.clientsecret;
redirecturi = "http://localhost:8888/callback";
scopes = "user-read-currently-playing";

var open = require('open');

var apikey = process.env.apikey;
 
var opts = {
  maxResults: 10,
  key: apikey
};

function refreshToken(){

request.post(
    {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(clientid + ':' + clientsecret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }

    },
    function test(err, res) {
      console.log(process.env.clientid)
      console.log(res.body);
        var test = JSON.parse(res.body);
        var testerino = '123';
        console.log(JSON.stringify(test));
        console.log(clientid);
        //fs.writeFile("memes.html", JSON.stringify(res.body));
        access_token = test.access_token;
        process.env.access_token = access_token;
        fs.writeFile('AccessToken.txt', access_token);

    }
)};

function getTrack(){
request.get(
  {
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    client_id: clientid,
    response_type: "code",
    redirect_uri: redirecturi,
    scope: scopes,
    headers: { Authorization: "Bearer " + access_token }
  },
  function getTrack(err, res) {
    if (err)
    {
      console.log('no response');
      return;
    }
      var statCode = res.statusCode;
    if (statCode === 401)
        refreshToken();
    //fs.writeFile("memes.html", res);
    if (!res.body)
      return;
    var Jayson = JSON.parse(res.body);
    var SongName = Jayson.item.name;
    var Artist = Jayson.item.artists[0];

    if (SongName == LastSongName)
        return;
    LastSongName = SongName;
    console.log(SongName);
    getVideo(SongName);

  }
);
}

function getVideo(title)
{
request.get(
  {
    url: "https://www.googleapis.com/youtube/v3/search",
    qs:{part: "snippet", key: apikey, q:title}
  },
  function getTrack(err, res) {
    if (err)
      return;
    var bod = JSON.parse(res.body);
    console.log(bod.items[0].id.videoId);
    var id = bod.items[0].id.videoId;
    open('https://youtu.be/' +  id);

  }
);
}

refreshToken();
setInterval(getTrack, 1000);
