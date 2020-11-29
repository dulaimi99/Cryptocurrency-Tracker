
// Getting cors error
function getnews(){
    fetch('https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=bitcoin&apiKey=1f0af31cdfd047d4b02f887df2b38601', {headers: new Headers({"X-Requested-With":"crypto"})})
    .then(a => a.json())
    .then(response => {
        for (var i =0; i < response.articles.length; i++){
            document.getElementById("output").innerHTML+="<div style='padding-top: 20px;'><img style='float:left; width: 100px;' src='"+response.articles[i].urlToImage+"'><h4>"+response.articles[i].title+"</h4>"+response.articles[i].source.name+"<br>"+response.articles[i].description+" <a href='"+response.articles[i].url+"'target='_blank'>"+response.articles[i].url+"</a></div>";
        }
    })
}