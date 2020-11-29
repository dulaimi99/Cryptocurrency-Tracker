


var apikey = {
    key:'c0389b1a-3536-465c-8e3b-5935762f2f4e'
}

var myArray = []
	

	$.ajax({
		method:'GET',
		url:'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apikey.key,
		success:function(response){
			myArray = response.data
			buildTable(myArray)
			console.log(myArray)
		}
	})

    $('#search_input').on('keyup', function(){
        var value = $(this).val()
        console.log('Value:', value)
        var data = searchTable(value, myArray)
        buildTable(data)
    })

    function searchTable(value, data){
        var filteredData = []

        for(var i = 0; i < data.length; i++){
            value = value.toLowerCase()
            var name = data[i].name.toLowerCase()

            if(name.includes(value)){
                filteredData.push(data[i])
            }
        }
        return filteredData
    }

    buildTable(myArray)

	function buildTable(data){
		var table = document.getElementById('myTable')
        table.innerHTML = ''
		// for (var i = 0; i < data.length; i++){
        for (var i = 1; i <= 25; i++){
            var row = `<tr>
                            <td>${i}</td>
							<td>${data[i].name} (${data[i].symbol})</td>
							<td>$${data[i].quote.USD.price.toFixed(2)}</td>
                            <td>$${data[i].quote.USD.market_cap.toFixed(0)}</td>
                            <td>$${data[i].quote.USD.volume_24h.toFixed(0)}</td>
					  </tr>`
			table.innerHTML += row
		}
	}