var request = require("request"); // "Request" library
var fs = require("fs");
var access_token =
  fs.readFileSync('AccessToken.txt');
var refresh_token =
  fs.readFileSync('RefreshToken.txt');
var LastSongName = "";

clientid = fs.readFileSync('ClientID.txt');
clientsecret = fs.readFileSync('ClientSecret.txt');
redirecturi = "http://localhost:8888/callback";
scopes = "user-read-currently-playing";

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
        var test = JSON.parse(res.body);
        var testerino = '123';
        //console.log(JSON.stringify(test));
        console.log("what");
        //fs.writeFile("memes.html", JSON.stringify(res.body));
        access_token = test.access_token;
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
  }
);
}

setInterval(getTrack, 1000);
