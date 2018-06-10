var app = new Vue({
    el: '#app',
    data: {
        run: false,
        postData: [
            { apikey: null },
            { apisecret: null },
            { percentage: null }
        ]
    },
    methods: {
        getPrice: function () {
            var url = 'https://api.coinmarketcap.com/v2/ticker/1/';
            axios.get(url)
                .then(function (res) {
                    console.log(res);
                })
                .catch(function (err) {
                    console.log(err);
                })
        },
        validateForm: function () {
            for (var i = 0; i < postData.length; i++) {
                if (postData[i].value == "") {
                    return true;
                }
            }
            return false;
        },
        postAjax: function () {
            // validate
            var validate = validateForm();

            var data = {};
            for (let i = 0; i < postData.length; i++) {
                data[`${postData[i].label}`] = `${postData[i].value}`;
            }

            axios({
                method: 'post',
                data: JSON.stringify(data),
                url: '/price'
            })
        }
    }
})