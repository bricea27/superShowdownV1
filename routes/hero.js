var express = require('express');
var router = express.Router();
var request = require('request');
// var apiKeys = require('../apiKeys.js');

const SUPERHEROAPI_KEY = process.env.SUPERHEROAPI_KEY;

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  request(`http://superheroapi.com/api/${SUPERHEROAPI_KEY}/${id}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.json(data);
    }
  });
});

module.exports = router;
