var express = require('express');
var router = express.Router();
var request = require('request');
var apiKeys = require('../apiKeys.js');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  request(`http://superheroapi.com/api/${apiKeys['SUPERHEROAPI_KEY']}/${id}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      data = JSON.parse(body);
      res.json(data);
    }
  });
});

module.exports = router;
