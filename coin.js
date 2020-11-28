var apikey = {
    key:'c0389b1a-3536-465c-8e3b-5935762f2f4e'
}
    
request('GET','https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apikey.key)
.then((r1) => {
    var x1 = JSON.parse(r1.target.responseText);
    
    console.log(x1.data);
    // console.log(x1.data.quote.USD.total_market_cap);
    // for (var i =0; i < x1.data.length; i++){
    /* for (var i =0; i < 15; i++){
        document.getElementById("output2").innerHTML+="<b>"+x1.data[i].name+"</b>"+" "+x1.data[i].symbol+"<br>";
    } */

    var body = document.getElementsByTagName("body")[0];
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // creating all cells
  for (var i = 0; i < 15; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      var cellText = document.createTextNode(x1.data[i].name+" "+x1.data[i].symbol);
      var cell2 = document.createElement("td");
      var cellText2 = document.createTextNode(" "+x1.data[i].quote.USD.price);
      cell.appendChild(cellText);
      row.appendChild(cell);
      cell.appendChild(cellText2);
      row.appendChild(cell2);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");

}).catch(err => {
    console.log(err);
})  
    
function request(method, url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = resolve;
            xhr.onerror = reject;
            xhr.send();
        });
}