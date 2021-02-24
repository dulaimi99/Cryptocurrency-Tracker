/**************************************
 Populuating cryptocurrency table
 *************************************/

//perform API call to coinGecko API
async function request_table_data(url)
{
    const response = await fetch(url);
    const data = await response.json()
    return data; 
}

 //Request data from CMC API
async function request_table()
{
   // list of top 10 coins
   top_crypto = ['bitcoin','ethereum','tether','polkadot','cardano','litecoin','chainlink','stellar','uniswap','dogecoin']
   
   //API base url
   url = "https://api.coingecko.com/api/v3/coins/"
   
   //for loop variables
   var l = 0;

   //result array
   result = []

   for(l; l < top_crypto.length; ++l)
   {

        //fetch coin info and pass it to 
        await request_table_data(url+top_crypto[l])
        .then(response => 
        {
            result.push(response)
        })
        .catch(error => {console.log(error)})
   }

   //call function to insert into table
   console.log(result)
   add_listings(result)
   
}

//populate table with entries

var entry_count = 0;

function add_listings(data_list)
{    

    //table element
    const table = document.getElementById("table_body")

    //iteration var
    var i = 0;
    //row syntax to be inserted into HTML table
    var row;
    for(i; i < data_list.length;++i)
    {
        //add listings to table
        row = 
        `<tr>
        <td>${i+1}</td>
        <td  >
            <a class="name" href="https://dulaimi99.github.io/Cryptocurrency-Tracker/HTML/details.html?currency=${data_list[i].name}">
                ${data_list[i].name} (${data_list[i].symbol.toUpperCase()})
            </a>
        </td>
        <td>$${numeral(data_list[i].market_data.current_price.usd).format('0,0.00')}</td>
        <td>$${numeral(data_list[i].market_data.market_cap.usd).format('0,0')}</td>
        <td>$${numeral(data_list[i].market_data.total_volume.usd).format('0,0')}</td>
        <td>${numeral(data_list[i].market_data.price_change_percentage_7d).format('0,0.00')}%</td>
        <td>${numeral(data_list[i].market_data.price_change_percentage_24h).format('0,0.00')}%</td>
        </tr>`
        table.innerHTML += row
    }
    return true;
}

/******************************
 Search
 *****************************/
// extract search parameter and create new page
function load_crypto()
{
    //extract search query
    search_value = document.getElementById("search_input").value;
    
    //construct new url
    var url = "https://dulaimi99.github.io/Cryptocurrency-Tracker/details.html?currency=" + search_value

    //load new page
    window.open(url)
}







