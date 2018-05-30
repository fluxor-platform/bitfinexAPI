
// var request = require('request');

// module.exports = {
//     getPrice: function () {
//         var obj = {};
//         request('https://api.coinmarketcap.com/v2/ticker/1/', function (err, res, body) {
//             if (err) {
//                 console.log('err');
//                 obj.err = "err";
//             } else {
//                 var priceObj = JSON.parse(body);
//                 obj.symbol = priceObj.data.symbol;
//                 obj.price = priceObj.data.quotes.USD.price;
//             }
//         })
//         return obj;
//     }
// }

