var express = require('express');
var router = express.Router();
var path = require('path');

const BFX = require('bitfinex-api-node');
const auth = require('./auth');

router.post('/', async function (req, res) {
    console.log(req);

    var API_KEY = req.body.apikey;
    var API_SECRET = req.body.apisecret;


    // validate API
    const bfx = auth.authentication(API_KEY, API_SECRET);

    // REST API
    const rest = bfx.rest(2, { transform: true });

    var data = {};

    // get price
    // data.price = await rest.ticker('tBTCUSD')
    //     .then(function (value) {
    //         return value;
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     })
    // get positions
    data.positions = await
    rest.positions(response => {
        console.log(response);
    });
    // res.send(JSON.stringify(data));
})

module.exports = router;