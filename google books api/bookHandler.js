const http = require('http');
var request = require('request');
var url = require('url');
const express = require('express');
const app = express();
const axios = require('axios');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/books/:search', (req, res) => {

    const search = req.params.search;
    //console.log(s);

    request('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyDM_IZxEldDe3XwtL24x3nuHaR2clWNJ_E&maxResults=40',  function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.write(body);
                res.end();
                console.log(body);
            }
    })

});
/*

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('welcome to book x-change');
        res.end();
    }
    
    if(req.url === '/books') {
        //res.write(JSON.stringify.stringify(["harry potter 1", "harry potter 2", "da vinci code"]));
        /*
        request({
      	method: 'GET',
     	url: 'https://www.googleapis.com/books/v1/volumes?q="harry potter"',
      	headers: {'Authorization': 'Bearer ' + 'AIzaSyDM_IZxEldDe3XwtL24x3nuHaR2clWNJ_E'}},
      	function (error, response, body){
      		if(!error && response.statusCode == 200){
       		 res.json(body);
     		}
        });
        
       //var name = url.parse(req.url, true).query['search'];
       //console.log(name);
       request('https://www.googleapis.com/books/v1/volumes?q=isbn:9780062457738&key=AIzaSyDM_IZxEldDe3XwtL24x3nuHaR2clWNJ_E',  function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.write(body);
                res.end();
                //console.log(body);
            }
        })
        
      
        
    }

});
*/

//server.listen(8080);
app.listen(8080);

console.log('working');
