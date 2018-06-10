$(document).ready(function () {
    // get price from marketcap
    function getPrice() {
        var obj = {};
        var url = 'https://api.coinmarketcap.com/v2/ticker/1/'
        $.getJSON(url, function (data) {
            obj.symbol = data.data.symbol;
            obj.price = data.data.quotes.USD.price;
            $('#symbol').html(symbol);
            $('#price').html(price);
        })
        return obj;
    }
    // validate submitform
    function validateForm(form) {
        var formArr = form[0];
        for (var i = 0; i < formArr.length; i++) {
            if (formArr[i].value == "") {
                return true;
            }
        }
        return false;
    }

    // prepare JSON data
    function takeData(form, dataObj) {
        var formArr = form[0];
        for (var i = 0; i < formArr.length; i++) {
            var eKey = formArr[i];
            dataObj[`${eKey.name}`] = `${eKey.value}`;
        }
    }

    // ajax post form
    async function ajaxForm(data, url) {
        return await $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: url
        }).done(async function (response) {
            return response;
        })
    }


    var switcher = null;
    var coinCapPrice, bitPrice;

    $('#submitform').submit(function (e) {
        e.preventDefault();
        var timer = Number($('#timer').val()) * 1000;

        // validate
        if (validateForm($(this))) {
            return;
        }


        if (!switcher) {

            $('input:not(#submit)').prop('disabled', true);
            var data = {};
            takeData($(this), data);
            // console.log(JSON.stringify(data));

            switcher = setInterval(function () {
                coinCapPrice = getPrice();
                bitPrice = ajaxForm(data, '/price')
                .then(result => {
                    var bitfinexJSON = JSON.parse(result);
                    var percentage = Number($('#percentage').val());
                    
                    // coinMarketCapPrice average
                    var average = coinCapPrice.price;

                    // var lowestPrice = bitfinexJSON.bid * (1 - 0.01 * percentage);
                    // var hightPrice = bitfinexJSON.ask * (1 + 0.01 * percentage);
                    
                    // not sure about strategy
                    // if(average < lowestPrice || average > hightPrice){
                        checkingMarket = ajaxForm(data, '/market')
                        .then(data => {
                            console.log(JSON.parse(data));
                        })
                    // }
                })

            }, timer);


        } else {
            clearInterval(switcher);
            switcher = null;
            $('input:not(#submit)').prop('disabled', false);
        }

    })
})