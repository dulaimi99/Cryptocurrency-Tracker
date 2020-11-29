
function getGraph(coin) {
	let prom = fetchList("https://api.coingecko.com/api/v3/coins/list");
	prom.catch(error => { console.error(error.message); });
	prom.then(list => {
		for(var i=0; i < list.length; i++){
			if(coin == list[i].name) {
                var id = list[i].id;
                price_chart(id);
                return;
            }
        }
    })
}

function price_chart(id) {
    let prom = fetchGraphData(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`);
	prom.catch(error => { console.error(error.message); });
	prom.then(data => {
        //console.log(data);
        var temp_prices = data.prices;
        var prices = [];
        var dates = [];
        for(var i = 0; i < temp_prices.length; i++) {
            prices.push(temp_prices[i][1]);
            dates.push(moment(temp_prices[i][0]).format('lll'));
        }

/*         for(i = 0; i < 8; i++) {
            console.log(dates[i])
        }

        var m_cap = data.market_caps;
        var t_vol = data.total_volumes; */


        var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Daily Price',
                data: prices,
                backgroundColor: [
                    'rgba(99, 255, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(99, 255, 132, 1)',

                ],
                borderWidth: 1 
            }]
            },
            options: {
                responsive: true,
                ticks: {
                    source: 'labels'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                return '$' + value;
                            }
                        }
                    }]
                }
            }
        });

    })
    
}


async function fetchGraphData(url) {
    
    let response = await fetch(url);
    if (response.status == 200) {
        data = await response.json();
        return data;
    }
    throw new Error(response.status);
}

async function fetchList(url) {
    
    let response = await fetch(url);
    if (response.status == 200) {
        list = await response.json();
        return list;
    }
    throw new Error(response.status);
}
