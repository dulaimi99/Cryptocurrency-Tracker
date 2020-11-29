


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
    
    $('th').on('click', function(){
		var column = $(this).data('column')
		var order = $(this).data('order')
		var text = $(this).html()
		text = text.substring(0, text.length - 1)

		if(order == 'desc'){
			$(this).data('order', "asc")
			myArray = myArray.sort((a,b) => a[column] > b[column] ? 1 : -1)
			text += '&#9660'

		}else{
			$(this).data('order', "desc")
			myArray = myArray.sort((a,b) => a[column] < b[column] ? 1 : -1)
			text += '&#9650'

		}
		$(this).html(text)
		buildTable(myArray)
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
		for (var i = 0; i < data.length; i++){
            var row = `<tr>
                            <td>${i}</td>
							<td>${data[i].name} (${data[i].symbol})</td>
                            <td>$${data[i].quote.USD.price.toFixed(2)}</td>
                            <td>${data[i].quote.USD.percent_change_7d.toFixed(2)}%</td>
                            <td>${data[i].quote.USD.percent_change_24h.toFixed(2)}%</td>
                            <td>$${data[i].quote.USD.market_cap.toFixed(0)}</td>
                            <td>$${data[i].quote.USD.volume_24h.toFixed(0)}</td>
					  </tr>`
			table.innerHTML += row
		}
	}