var express = require('express');
var app = express();

const cors = require('cors');
app.use(cors());
'use strict';

const yelp = require('yelp-fusion');
const yelpClient = yelp.client('xxx');

// Create client with a Promise constructor
const googleMapsClient = require('@google/maps').createClient({
  key: 'xxx',
  Promise: Promise // 'Promise' is the native constructor.
});


// Only for testing. Respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
})

app.get('/yelp/businesses/matches/best', function (req, res) {

    // matchType can be 'lookup' or 'best'
    yelpClient.businessMatch('best', {
      name: req.query.name,
      address1: req.query.address1,
      address2: req.query.address2,
      city: req.query.city,
      state: req.query.state,
      country: req.query.country
    }).then(response => {
        console.log(response.jsonBody.businesses[0]);
        console.log(response.jsonBody.businesses[0]);
        
        yelpClient.reviews(response.jsonBody.businesses[0].id).then(response => {
        res.json(response.jsonBody.reviews);
        console.log(response.jsonBody.reviews);
        }).catch(e => {
          console.log(e);
            res.end();
        });
        
    }).catch(e => {
      console.log(e);
        res.end();
    });
})

app.get('/google/places', function (req, res) {

    googleMapsClient.placesNearby({keyword: req.query.keyword, type: req.query.category, radius: Number(req.query.distance), location: [req.query.lat, req.query.lng]}).asPromise()
      .then((response) => {
        console.log(response.json.results);
        console.log(response.json.next_page_token);
        res.json(response.json);
      })
      .catch((err) => {
        console.log(err);
        res.end();
      });    
})

app.get('/google/places/nextpage', function (req, res) {
    
    // Geocode an address with a promise
    googleMapsClient.placesNearby({pagetoken: req.query.pagetoken, location: [req.query.lat, req.query.lng]}).asPromise()
      .then((response) => {
        console.log(response.json.results);
        console.log(response.json.next_page_token);
        res.json(response.json);
      })
      .catch((err) => {
        console.log(err);
        res.end();
      });    
})

app.listen(8080, () => console.log('App is listening on port 8080.'))
