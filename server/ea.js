
var http = require('http');
const BFX = require('bitfinex-api-node');
const debug = require('debug')('bfx:examples:ws2_auth');

// const request = require('request');
// const crypto = require('crypto');
// const Table = require('cli-table2')

const API_KEY = '';
const API_SECRET = '';


const bfx = new BFX({
  apiKey: API_KEY,
  apiSecret: API_SECRET,

  ws: {
    autoReconnect: true,
    seqAudit: true,
    packetWDDelay: 10 * 1000
  }
});
const Order = BFX.Models.Order;

// REST API
const rest = bfx.rest(2, { transform: true });

// WEBSOCKET API
const ws = bfx.ws();

function returnOrders() {
  // rest.positions((err, res) => {
  //     if (err) console.log(err);
  //     console.log(res);
  // })


  ws.on('error', (err) => console.log(err))
  ws.on('open', ws.auth.bind(ws))

  ws.once('auth', () => {
    const o = new Order({
      cid: Date.now(),
      symbol: 'tETHUSD',
      amount: 0.05,
      type: Order.type.MARKET
    }, ws)

    // Enable automatic updates
    o.registerListeners()

    o.on('update', () => {
      console.log(`order updated: ${o.serialize()}`)
    })

    o.on('close', () => {
      console.log(`order closed: ${o.status}`)
      ws.close()
    })

    o.submit().then(() => {
      console.log(`submitted order ${o.id}`)
    }).catch((err) => {
      console.error(err)
      ws.close()
    })
  })

  ws.open()

}
//
// 
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // authentication();
  returnOrders();
  console.log('listen to port: 8080');

}).listen(8080);


