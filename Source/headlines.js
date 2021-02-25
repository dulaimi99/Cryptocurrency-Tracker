//headline api call
function request_headlines()
{
  //HTTP request options
  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {q: 'cryptocurrency', freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
    headers: {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-key': '2825d79701mshcd34ae4ab6578eep113f61jsnd1988d042da3',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com'
    }
  };
  
  //API call
  axios.request(options)
  .then(function(response)
  {
    //pass headlines to sorting function
    sort_headlines(response.data.value);
  })
  .catch(function (error) {
    console.error(error);
  });
}

//sort and display headlines
function sort_headlines(headline_array)
{
	 //headlines container
  var list = document.getElementById('headlines_list')
  
  //new li element variable
  var new_headline;

  //for loop variable
  var i;

  //add headlines
  for(i = 0; i < 10; i++)
  {
    //check if source has image
    if(headline_array[i].image !== undefined)
    {
      //new headline entry
      new_headline = 
      `<a href="${headline_array[i].url}" class="headline"  > 
        <img src="${headline_array[i].image.thumbnail.contentUrl}" alt="Headline image">
        <h6>${headline_array[i].name}</h6> 
        </a>`
      //append  it to list 
      list.innerHTML += new_headline;
    
    }
  }
}

