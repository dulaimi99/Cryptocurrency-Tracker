var apikey = {
    key:'c0389b1a-3536-465c-8e3b-5935762f2f4e'
}
    
request('GET','https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apikey.key)
.then((r1) => {
    var x1 = JSON.parse(r1.target.responseText);
    
    console.log(x1.data);
    // console.log(x1.data.quote.USD.total_market_cap);
    // for (var i =0; i < x1.data.length; i++){
    for (var i =0; i < 15; i++){
        document.getElementById("output2").innerHTML+="<b>"+x1.data[i].name+"</b>"+" "+x1.data[i].symbol+"<br>";
    }
}).catch(err => {
    console.log(err);
})  
    
function request(method, url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = resolve;
            xhr.onerror = reject;
            xhr.send();
        });
}