
console.log(moment())

charting()

function charting(){
    let prom = fetchGraphData("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily");
	prom.catch(error => { console.error(error.message); });
	prom.then(data => {
        console.log(data);
        var temp_prices = data.prices;
        var prices = [];
        var dates = [];
        for(var i = 0; i < temp_prices.length; i++) {
            prices.push(temp_prices[i][1]);
            let temp = new Date(temp_prices[i][0])
            dates.push(temp);
        }

        for(i = 0; i < 8; i++) {
            console.log(dates[i].toDateString())
        }

        var m_cap = data.market_caps;
        var t_vol = data.total_volumes;

        //console.log(prices, m_cap, t_vol);
        var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Daily Prices',
                data: prices,
    /*             backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1 */
            }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                day: 'MMM D'
                            }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
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
