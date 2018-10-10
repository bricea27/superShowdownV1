const express = require('express');
const path = require('path');
const request = require('request');
const app = express();

const SUPERHEROAPI_KEY = process.env.SUPERHEROAPI_KEY;
const port = process.env.PORT || 8080;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/hero/:id', function(req, res, next) {
  let id = req.params.id;
  request(`http://superheroapi.com/api/${SUPERHEROAPI_KEY}/${id}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.json(data);
    }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);

console.log(`Server listening on ${port}`);
