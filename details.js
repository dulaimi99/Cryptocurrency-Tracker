function getInfo(coin) {
	let prom = fetchList("https://api.coingecko.com/api/v3/coins/list");
	prom.catch(error => { console.error(error.message); });
	prom.then(list => {
		for(var i=0; i < list.length; i++){
			if(coin == list[i].name) {
                var id = list[i].id;
                pushInfo(id);
                return;
            }
        }
    })
}

function pushInfo(id) {
	let prom = fetchInfo(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`);
	prom.catch(error => { console.error(error.message); });
	prom.then(info => {
        document.getElementById("descrip").innerHTML = info.description.en;
    })
}



function getNumbers(coin) {
	let prom = fetchList("https://api.coingecko.com/api/v3/coins/list");
	prom.catch(error => { console.error(error.message); });
	prom.then(list => {
		for(var i=0; i < list.length; i++){
			if(coin == list[i].name) {
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
}


async function fetchInfo(url) {
    
    let response = await fetch(url);
    if (response.status == 200) {
        info = await response.json();
        return info;
    }
    throw new Error(response.status);
}
