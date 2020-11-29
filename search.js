var currency = [];
pushList();

function pushList() {
	let prom = fetchList("https://api.coingecko.com/api/v3/coins/list");
	prom.catch(error => { console.error(error.message); });
	prom.then(list => {
		var i;
		for(i=0; i < list.length; i++){
			currency.push(list[i].name);
        }
        for (i in currency) {
            var optionElement = document.createElement("option");
            optionElement.value = currency[i];
            document.getElementById("currency").appendChild(optionElement);
        }
    })

}

async function fetchList(url) {
    
    let response = await fetch(url);
    if (response.status == 200) {
        list = await response.json();
        return list;
    }
    throw new Error(response.status);
}

