var express = require('express');
var router = express.Router();
var path = require('path');


const BFX = require('bitfinex-api-node');
const auth = require('./auth');

router.post('/', function (req, res) {
    var API_KEY = req.body.apikey;
    var API_SECRET = req.body.apisecret;

    // validate API
    const bfx = auth.authentication(API_KEY, API_SECRET);

    // REST API
    const rest = bfx.rest(2, { transform: true });

    var bitPrice = {};

    rest.ticker('tBTCUSD', function (err, res, body) {
        bitPrice.bid = res.bid;
        bitPrice.ask = res.ask;
    }).then(function () {
        res.send(JSON.stringify(bitPrice));
    })
})

module.exports = router;
// const request = require('request');
// const crypto = require('crypto');
// const Table = require('cli-table2')

// const API_KEY = '123';
// const API_SECRET = '456';

// const bfx = auth.authentication(API_KEY, API_SECRET);



// const Order = BFX.Models.Order;

// // REST API
// const rest = bfx.rest(2, { transform: true });

// // WEBSOCKET API
// const ws = bfx.ws();

// function returnOrders() {

//   ws.on('error', (err) => console.log(err))
//   ws.on('open', ws.auth.bind(ws))

//   ws.once('auth', () => {
//     const o = new Order({
//       cid: Date.now(),
//       symbol: 'tETHUSD',
//       amount: 0.05,
//       type: Order.type.MARKET
//     }, ws)

//     // Enable automatic updates
//     o.registerListeners()

//     o.on('update', () => {
//       console.log(`order updated: ${o.serialize()}`)
//     })

//     o.on('close', () => {
//       console.log(`order closed: ${o.status}`)
//       ws.close()
//     })

//     o.submit().then(() => {
//       console.log(`submitted order ${o.id}`)
//     }).catch((err) => {
//       console.error(err)
//       ws.close()
//     })
//   })

//   ws.open()

// }

