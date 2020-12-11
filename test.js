<<<<<<< HEAD
const { get } = require("http");
var fetch = require("node-fetch");

=======
/* const { get } = require("http");
var fetch = require("node-fetch"); */
//const { resolve } = require("path");

/*
const key = 'dddd7b23-d72f-48c8-934f-33136b9b827b'
let init = 
{
    method: 'GET',
    Headers: {
        'X-CMC_PRO_API_KEY': key 
    },
    mode: 'cors',

}
*/


/*let init = 
{
    method: 'GET',
    mode: 'cors',
    headers:
    {
        
        //host : 'cors-anywhere.herokuapp.com',
    }
}
*/
/*

queryparams: {
        CMC_PRO_API_KEY: process.env.CMC_API_KEY,
      },


headers: {
        'X-CMC_PRO_API_KEY': 'dddd7b23-d72f-48c8-934f-33136b9b827b',
      },

*/
>>>>>>> 36c7c2b0df056b2dd771621396cbf56122732381

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
<<<<<<< HEAD
    'X-CMC_PRO_API_KEY': 'dddd7b23-d72f-48c8-934f-33136b9b827b',
=======
    'X-CMC_PRO_API_KEY': 'c0389b1a-3536-465c-8e3b-5935762f2f4e',

>>>>>>> 36c7c2b0df056b2dd771621396cbf56122732381
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
