var app = new Vue({
    el: '#app',
    data: {
        coinMarketSymbol: '',
        coinMarketPrice: 0,
        price: {},
        positions: {},
        run: null,
        postData: [
            {
                label: 'apikey',
                value: null
            },
            {
                label: 'apisecret',
                value: null
            },
            {
                label: 'percentage',
                value: null
            }
        ],
        loop: 0
    },
    methods: {
        getPrice: function () {
            var url = 'https://api.coinmarketcap.com/v2/ticker/1/';
            // var url = '/test';
            return axios.get(url)
                .then(function (res) {
                    return {
                        symbol: res.data.data.symbol,
                        price: res.data.data.quotes.USD.price
                    }
                })
                .catch(function (err) {
                    return {
                        err: err
                    }
                })
        },
        postAjax: function () {
            // validate
            var validate = !this.postData[0].value && !this.postData[1].value && !this.postData[2].value;
            if (!validate) {
                var data = {};
                for (let i = 0; i < this.postData.length; i++) {
                    data[`${this.postData[i].label}`] = `${this.postData[i].value}`;
                }
                console.log(data);
                if (!this.run) {
                    var self = this;
                    this.run = setInterval(function () {
                        self.getPrice()
                        .then(res => {
                            self.coinMarketSymbol = res.symbol;
                            self.coinMarketPrice = res.price;
                        })

                        axios({
                            method: 'post',
                            data: JSON.stringify(data),
                            url: '/market'
                        })
                            .then(function (res) {
                                console.log(res);
                                // self.price = res.price;
                                // self.positions = res.positions;
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }, this.loop * 1000)
                }
            }
        }
    }
})
