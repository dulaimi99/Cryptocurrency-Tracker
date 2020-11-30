function getInfo(coin) {
    if(coin) { //unhides table
        var table = document.getElementById("numbers");
        table.style.display = '';
    }
    
    let prom = fetchList("https://api.coingecko.com/api/v3/coins/list");
	prom.catch(error => { console.error(error.message); });
	prom.then(list => {
		for(var i=0; i < list.length; i++){
			if(coin.toLowerCase() == list[i].name.toLowerCase()) {
                var id = list[i].id;
                pushInfo(id);
                return;
            }
        }
        if(coin) { 
            document.getElementById("descrip").innerHTML = "No cryptocurrency found with that name. Please try searching again."
        }
    })
}

function pushInfo(id) {
	let prom = fetchInfo(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
	prom.catch(error => { console.error(error.message); });
	prom.then(info => {
        document.getElementById("descrip").innerHTML = info.description.en;

        var price = info.market_data.current_price.usd;
        var cap = info.market_data.market_cap.usd;
        var vol = info.market_data.total_volume.usd;
        var high = info.market_data.high_24h.usd;
        var low = info.market_data.low_24h.usd;
        var percent24h = info.market_data.price_change_percentage_24h_in_currency.usd;
        var percent7d = info.market_data.price_change_percentage_7d_in_currency.usd;
        var percent14d = info.market_data.price_change_percentage_14d_in_currency.usd;

        document.getElementById("price").innerHTML = "$" + price;
        document.getElementById("cap").innerHTML = "$" + cap; 
        document.getElementById("vol").innerHTML = "$" + vol;
        if(high) {
            document.getElementById("hl").style.display ='';
            document.getElementById("hilo").innerHTML = "$" + high + " / $" + low;
        }
        if(percent24h) {
            document.getElementById("24pc").style.display ='';
            document.getElementById("24h%").innerHTML = percent24h + "%"
        }
        if(percent7d) {
            document.getElementById("7dpc").style.display ='';
            document.getElementById("7d%").innerHTML = percent7d + "%"
        }
        if(percent14d) {
            document.getElementById("14dpc").style.display ='';
            document.getElementById("14d%").innerHTML = percent14d + "%"
        }
        
    })
}



/* function getNumbers(coin) {
	let prom = fetchList("https://api.coingecko.com/api/v3/coins/list");
	prom.catch(error => { console.error(error.message); });
	prom.then(list => {
		for(var i=0; i < list.length; i++){
			if(coin.toLowerCase() == list[i].name.toLowerCase()) {
                var id = list[i].id;
                pushNumbers(id);
                return;
            }
        }
    })
}

function pushNumbers(id) {
	let prom = fetchInfo(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=0&interval=daily`);
	prom.catch(error => { console.error(error.message); });
	prom.then(info => {
        price = info.prices[0][1]
        cap = info.market_caps[0][1]
        vol = info.total_volumes[0][1]

        document.getElementById("price").innerHTML = "$" + price;
        document.getElementById("cap").innerHTML = "$" + cap; 
        document.getElementById("vol").innerHTML = "$" + vol;
    }) 
}*/


async function fetchInfo(url) {
    
    let response = await fetch(url);
    if (response.status == 200) {
        info = await response.json();
        return info;
    }
    throw new Error(response.status);
}
