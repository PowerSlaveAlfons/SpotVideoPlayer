var request = require("request"); // "Request" library
var fs = require("fs");


var LastSongName = "";
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
    fs.writeFile("memes.html", res.body);
    var Jayson = JSON.parse(res.body);
    var SongName = Jayson.item.name;
    var Artist = Jayson.item.artists[0];

    if (SongName == LastSongName)
        return;
    LastSongName = SongName;
    console.log(SongName);
  }
);
}

setInterval(getTrack, 1000);
