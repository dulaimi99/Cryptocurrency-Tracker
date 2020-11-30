//headline api call
function request_headlines()
{
  //options
  const options = {
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    params: {
      pageSize: '10',
      q: 'cryptocurrency',
      autoCorrect: 'false',
      pageNumber: '1',
      toPublishedDate: 'null',
      fromPublishedDate: 'null'
    },
    headers: {
      'x-rapidapi-key': '2825d79701mshcd34ae4ab6578eep113f61jsnd1988d042da3',
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
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
  let list = document.getElementById('headlines_list')
  
  //new li element variable
  var new_headline;

  //for loop variable
  var i;

  //add headlines
  for(i = 0; i < 10; i++)
  {
    //new headline entry
    new_headline = 
    `<a href="${headline_array[i].url}" class="headline" >
          <h5>${headline_array[i].title}</h5> 
        </a>`
    //append  it to list 
    list.innerHTML += new_headline;
  }
}



