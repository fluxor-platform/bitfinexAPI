// 'use strict'

// require('dotenv').config()

// const BFX = require('../')
// const SocksProxyAgent = require('socks-proxy-agent')

// const { API_KEY, API_SECRET, REST_URL, WS_URL, SOCKS_PROXY_URL } = process.env
// const agent = SOCKS_PROXY_URL ? new SocksProxyAgent(SOCKS_PROXY_URL) : null

// const bfx = new BFX({
//   apiKey: API_KEY,
//   apiSecret: API_SECRET,

//   ws: {
//     url: WS_URL,
//     agent
//   },

//   rest: {
//     url: 'https://api.bitfinex.com/v2',
//     agent
//   }
// })

// module.exports = bfx

const BFX = require('bitfinex-api-node');

// const API_KEY = '';
// const API_SECRET = '';


export function authentication(API_KEY, API_SECRET) {
    return new BFX({
        apiKey: API_KEY,
        apiSecret: API_SECRET,

        ws: {
            autoReconnect: true,
            seqAudit: true,
            packetWDDelay: 10 * 1000
        }
    });
}

