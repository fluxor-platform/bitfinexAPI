var express = require('express');
var router = express.Router();

const auth = require('./auth');

router.post('/', function (req, res) {
    var API_KEY = req.body.apikey;
    var API_SECRET = req.body.apisecret;

    // validate API
    const bfx = auth.authentication(API_KEY, API_SECRET);

    // REST API
    const rest = bfx.rest(2, { transform: true });

    rest.ticker('tBTCUSD', function (err, response) {
        res.send(JSON.stringify(response));
    })
})

module.exports = router;