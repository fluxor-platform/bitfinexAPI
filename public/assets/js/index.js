var app = new VUE({
    el: '#app',
    data: {

    },
    method: {
        getPrice : function(){
            var url = 'https://api.coinmarketcap.com/v2/ticker/1/';
            axios.get(url)
                .then(function(res){
                    console.log(res);
                })
                .catch(function(err){
                    console.log(err);
                })
        }
    }
})