const { get } = require("http");
var fetch = require("node-fetch");

//check title function
function check_title(title)
{
    //check if keywords exist    
    if(title.toLowerCase().indexOf('crypto') != -1 || title.toLowerCase().indexOf('cryptocurrency') != -1 || title.toLowerCase().indexOf('bitcoin') != -1 || title.toLowerCase().indexOf('currency') != -1 )
    {
        return 0;
    }    

    //title doesn't include keywords
    return -1;

}


//api url
var url = 'http://newsapi.org/v2/everything?' +
          'q=cryptocurrency&' +
          'sortBy=popularity&' +
          'apiKey=a6b5c604768a47fcb7c6a7d4cf3316b2';

//get headlines
fetch(url)
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
    .then(json => sort_relevant_news(json))
    .catch(err => resolve_issue(err))


function sort_relevant_news(obj)
{
    //amount of headlines returned by API
    let total_results = obj.totalResults;
    //get only crypto currency news
    //console.log(obj.articles)
    
    //obj to store relevant headlines
    let relevant_headlines = [];
    var title;
    
    //loop thru results and get relevant data
    var i;

    for(i = 0; i < total_results; i++)
    {
        //article title
        title = obj.articles[i].title

            
        //check if it's relevant
        if(check_title(title) != -1)
        {
            //add to relevant headlineas
            relevant_headlines.push(obj.articles[i]);
        }
    }
    
    
    
    
    console.log(relevant_headlines)
    //console.log(obj.articles[i].title)
    //console.log(url)
}

function resolve_issue(obj)
{
    console.log("Couldn't obtain information")
}

