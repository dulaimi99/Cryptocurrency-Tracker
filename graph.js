
function graphDisplay(button) {
    if(button === "24"){
        document.getElementById("week_charts").style.display = "none";
        document.getElementById("2week_charts").style.display = "none";
        document.getElementById("24h_charts").style.display = "";
    }
    if(button === "week"){
        document.getElementById("week_charts").style.display = "";
        document.getElementById("2week_charts").style.display = "none";
        document.getElementById("24h_charts").style.display = "none";
    }
    if(button === "2week"){
        document.getElementById("week_charts").style.display = "none";
        document.getElementById("2week_charts").style.display = "";
        document.getElementById("24h_charts").style.display = "none";
    }
}


function getGraph(coin) {
	let prom = fetchList("https://api.coingecko.com/api/v3/coins/list");
	prom.catch(error => { console.error(error.message); });
	prom.then(list => {
		for(var i=0; i < list.length; i++){
			if(coin.toLowerCase() == list[i].name.toLowerCase()) {
                var id = list[i].id;
                if(coin) { //unhides buttons
                    var button = document.getElementById("col_b");
                    button.style.display = '';
                }
                charts(id);
                charts_24(id);
                charts_2w(id);
                return;
            }
        }
    })
}

function charts(id) {
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

        var temp_caps = data.market_caps;
        var caps = []
        for(var i = 0; i < temp_caps.length; i++) {
            caps.push(temp_caps[i][1]);
        }

        var vols = []
        var temp_vols = data.total_volumes; 
        for(var i = 0; i < temp_vols.length; i++) {
            vols.push(temp_vols[i][1]);
        }

        var atx = document.getElementById('prices_chart').getContext('2d');
        var prices_chart = new Chart(atx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Price',
                data: prices,
                backgroundColor: [
                    'rgba(99, 255, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(99, 255, 132, 1)',

                ],
                borderWidth: 1,
                lineTension: 0.2
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

        var btx = document.getElementById('caps_chart').getContext('2d');
        var caps_chart = new Chart(btx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Market Cap',
                data: caps,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1,
                lineTension: 0.2
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

        var ctx = document.getElementById('vols_chart').getContext('2d');
        var vols_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Total Volume',
                data: vols,
                backgroundColor: [
                    'rgba(132, 99, 255, 0.2)',

                ],
                borderColor: [
                    'rgba(132, 99, 255, 1)',

                ],
                borderWidth: 1,
                lineTension: 0.2 
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

function charts_24(id) {
    let prom = fetchGraphData(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`);
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

        var temp_caps = data.market_caps;
        var caps = []
        for(var i = 0; i < temp_caps.length; i++) {
            caps.push(temp_caps[i][1]);
        }

        var vols = []
        var temp_vols = data.total_volumes; 
        for(var i = 0; i < temp_vols.length; i++) {
            vols.push(temp_vols[i][1]);
        }

        var atx = document.getElementById('prices_chart_24').getContext('2d');
        var prices_chart = new Chart(atx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Price',
                data: prices,
                backgroundColor: [
                    'rgba(99, 255, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(99, 255, 132, 1)',

                ],
                borderWidth: 1,
                lineTension: 0.2
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

        var btx = document.getElementById('caps_chart_24').getContext('2d');
        var caps_chart = new Chart(btx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Market Cap',
                data: caps,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1,
                lineTension: 0.2
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

        var ctx = document.getElementById('vols_chart_24').getContext('2d');
        var vols_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Total Volume',
                data: vols,
                backgroundColor: [
                    'rgba(132, 99, 255, 0.2)',

                ],
                borderColor: [
                    'rgba(132, 99, 255, 1)',

                ],
                borderWidth: 1,
                lineTension: 0.2
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

function charts_2w(id) {
    let prom = fetchGraphData(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14&interval=daily`);
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

        var temp_caps = data.market_caps;
        var caps = []
        for(var i = 0; i < temp_caps.length; i++) {
            caps.push(temp_caps[i][1]);
        }

        var vols = []
        var temp_vols = data.total_volumes; 
        for(var i = 0; i < temp_vols.length; i++) {
            vols.push(temp_vols[i][1]);
        }

        var atx = document.getElementById('prices_chart_2w').getContext('2d');
        var prices_chart = new Chart(atx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Price',
                data: prices,
                backgroundColor: [
                    'rgba(99, 255, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(99, 255, 132, 1)',

                ],
                borderWidth: 1,
                lineTension: 0.2
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

        var btx = document.getElementById('caps_chart_2w').getContext('2d');
        var caps_chart = new Chart(btx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Market Cap',
                data: caps,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1,
                lineTension: 0.2 
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

        var ctx = document.getElementById('vols_chart_2w').getContext('2d');
        var vols_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Total Volume',
                data: vols,
                backgroundColor: [
                    'rgba(132, 99, 255, 0.2)',

                ],
                borderColor: [
                    'rgba(132, 99, 255, 1)',

                ],
                borderWidth: 1,
                lineTension: 0.2
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
