var express = require('express');
var rp = require('request-promise');
var parser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var app = express();
var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

app.use(morgan('dev'));

app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(parser.json({
  urlencoded: true
}));

app.get('/getToken', function(req, res) {

  var tokenObject = {
    method: "POST",
    uri: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString(
        'base64'))
    },
    json: true
  };

  return rp(tokenObject)
    .then(function(response) {
      console.log(response.access_token);
      return res.status(200).send(response.access_token);
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.get('/music/:token/tracks', function(req, res) {
  var token = req.params.token;

  function getTracks(token) {
    var albumsOption = {
      method: "GET",
      uri: 'https://api.spotify.com/v1/albums/3Yko2SxDk4hc6fncIBQlcM/tracks',
      form: {
        Authorization: 'Bearer ' + token
      },
      json: true,
    };

    return rp(albumsOption);
  }


  return getTracks(token)
    .then(function(response) {
      console.log(response);
      return res.status(200).send(response);
    })
    .catch(function(err) {
      console.log(err);
      if (err) return res.status(404);
      return res.status(500).send(err);
    });

});
app.use('/', express.static('public'));
app.use(express.static(__dirname + '/public'))



app.listen(3000, function() {
  console.log('Hello listening on port 3000');
});
