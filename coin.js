/*var apikey = {
    key:'c0389b1a-3536-465c-8e3b-5935762f2f4e'
}
*/
 //using cors anywhere to get around cors issue

 var myArray = []

 function request_table()
{
  let cors= 'https://cors-anywhere.herokuapp.com/'
  let api_link = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=25"
  let api_url = cors + api_link;
  
  let api_headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'close',
    'Host': 'cors-anywhere.herokuapp.com',
    'If-None-Match': "b493126da505af6fec015ec116fec193",
    'Origin': 'http://127.0.0.1:80/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'X-CMC_PRO_API_KEY': 'c0389b1a-3536-465c-8e3b-5935762f2f4e',
  }


   //fetch the api
   fetch(api_url,{api_headers})
   .then(
    function (response){
       if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
       }

       return response
    }     
   )
   .then(response => response.json())
   .then(json => buildTable(json.data))
   .catch(err => resolve_issue(err))
}



/*make api call
$.ajax({
  method:'GET',
  url:api_url,
  headers: api_headers,
  success:function(response){
    myArray = response.data
    buildTable(myArray)
    console.log(myArray)
  }
  })
*/
	
  
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

   
//function to build table
function buildTable(data){
var table = document.getElementById('myTable')
  table.innerHTML = ''
  for (var i = 0; i < data.length; i++){
    var row = 
    `<tr>
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


//function to catch error
function resolve_issue(obj)
{
    console.log(obj)
}