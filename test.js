const { get } = require("http");
var fetch = require("node-fetch");


let cors= 'https://cors-anywhere.herokuapp.com/'
let api_link = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=25"
let url = cors + api_link;


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

let query_param = {
    'limit' : '25'
}



fetch(url,{headers,query_param})
    .then(
     function (response){
        if (!response.ok) {
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if(response.ok)
        {
            console.log("Good response")
        }
        return response
     }     
    )
    .then(response => response.json())
    .then(json => do_things(json,url))
    .catch(err => resolve_issue(err))


function do_things(obj)
{
    console.log(obj.data)
    console.log(url)
}

function resolve_issue(obj)
{
    console.log(obj)
}
