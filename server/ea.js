
var http = require('http');
const BFX = require('bitfinex-api-node');
const debug = require('debug')('bfx:examples:ws2_auth');

const auth = require('./auth');
// const request = require('request');
// const crypto = require('crypto');
// const Table = require('cli-table2')

const API_KEY = '123';
const API_SECRET = '456';

const bfx = auth.authentication(API_KEY, API_SECRET);

console.log(bfx);

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

