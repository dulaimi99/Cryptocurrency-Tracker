/*const { get } = require("http");
var fetch = require("node-fetch");
*/
function create_table()
{
    //using cors anywhere to get around cors issue
    let cors= 'https://cors-anywhere.herokuapp.com/'
    let api_link = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=25"
    let url = cors + api_link;
    
    //request headers
    let headers = {
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
        'X-CMC_PRO_API_KEY': 'dddd7b23-d72f-48c8-934f-33136b9b827b',
    }
   
    //fetch the api
    fetch(url,{headers})
        .then(
         function (response){
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            return response
         }     
        )
        .then(response => response.json())
        .then(json => sort_listings(json.data))
        .catch(err => resolve_issue(err))
}


function sort_listings(listings_array)
{
    


    //insert data into to table
    var i;
    const list_length = 25
    
    //table element
    const table = document.getElementById("table")

    for(i = 0; i < list_length; i++)
    {
        //new row
        new_row = document.createElement("tr")
        
        //insert entry name 
        new_name = document.createElement("td")
        new_name.appendChild(document.createTextNode(listings_array[i].name))
        new_row.appendChild(new_name)

        //insert entry symbol 
        new_symbol = document.createElement("td")
        new_symbol.appendChild(document.createTextNode(listings_array[i].symbol))
        new_row.appendChild(new_symbol)

        //insert entry price 
        new_price = document.createElement("td")
        new_price.appendChild(document.createTextNode(listings_array[i].quote.USD.price  + "$"))
        new_row.appendChild(new_price)

        //insert entry supply 
        new_supply = document.createElement("td")
        new_price.appendChild(document.createTextNode(listings_array[i].circulating_supply))
        new_row.appendChild(new_supply)

        //insert entry market cap
        new_market_cap = document.createElement("td")
        new_market_cap.appendChild(document.createTextNode(listings_array[i].quote.USD.market_cap))
        new_row.appendChild(new_market_cap)

        //insert entry change last hour
        hour_1 = document.createElement("td")
        hour_1.appendChild(document.createTextNode(listings_array[i].quote.USD.percent_change_1h))
        new_row.appendChild(hour_1)

        //insert entry change last 24hour 
        hour_24 = document.createElement("td")
        hour_24.appendChild(document.createTextNode(listings_array[i].quote.USD.percent_change_24h))
        new_row.appendChild(hour_24)

        //insert entry change last 7 days 
        day_7 = document.createElement("td")
        day_7.appendChild(document.createTextNode(listings_array[i].quote.USD.percent_change_7d))
        new_row.appendChild(day_7)

        //add row to table
        table.appendChild(new_row)
    }

}

//function to catch error
function resolve_issue(obj)
{
    console.log(obj)
}