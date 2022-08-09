const http = require('http');
const db = require('./databaseControl.js');

//handle response starting here
db.connect();

http.createServer((request, response) => {
	//get the headers, method, and url from the request object
	const { headers, method, url } = request;
	let body = [];

	//on error: give to the console, send bad request status code, end response
	request.on('error', (err) => {
		console.error(err);
		response.statusCode = 400;
		response.end();
	})
	response.on('error', (err) => {
		console.error(err);
	})
	
	//on data, push onto the object body
	request.on('data', (chunk) => {
		body.push(chunk);
	})
	
	//on end, concatenate all of the body into a string and respond
	request.on('end', () => {
		body = Buffer.concat(body).toString();
		
		//set the header to statusCode = 200, with other information
		response.writeHead(200, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'});

		
		//check if the user is registered with userName and psw, return 1 for yes and 0 for no
		if (request.method === 'GET' && request.url === '/verify') {
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			//return user object if is valid, 0 otherwise
			db.checkUser(body, function(user){
				//create the response body
				const responseBody = { headers, method, url, user };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			});
		}
		//add a user to the DB, from registration
		else if(request.method === 'POST' &&  request.url === '/addUser') {
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			
			//return user object with userid attribute added
			db.addUser(body, function(id) {
				//create a new request body
				newBody = JSON.parse(body);
				
				//add the userid to the request body(>0 if a valid user), to create response body
				newBody.userid = id;
		
				//create the response body
				const responseBody = { headers, method, url, newBody };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			});
		}
		//add a book to a user, for seller
		else if(request.method === 'POST' &&  request.url === '/addBook') {
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			
			//return the book with bookid attribute added
			db.addBook(body, function(id) {
				//create a new request body
				newBody = JSON.parse(body);
				
				//add the userid to the request body(>0 if a valid user), to create response body
				newBody.bookid = id;
		
				//create the response body
				const responseBody = { headers, method, url, newBody };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			})
		}
		//get all books listed, for seller
		else if(request.method === 'GET' && request.url === '/getMyBooks') {
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			
			//return array of book objects
			db.getMyBooks(headers.userid, function(books) {
				//create a new body
				var newBody = JSON.parse(JSON.stringify(books));
		
				//create the response body
				const responseBody = { headers, method, url, newBody };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			});
			
		}	
		//get all books by isbn, for buyer
		//not working
		else if(request.method === 'GET' && request.url === '/getBooksISBN'){
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			
			//return array of book objects
			db.getBooksISBN(headers.isbn, function(books) {
				//create a new body
				var newBody = JSON.parse(JSON.stringify(books));
		
				//create the response body
				const responseBody = { headers, method, url, newBody };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			});
		}
		//get all books available
		else if(request.method === 'GET' && request.url === '/getAllBooks'){
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			
			//return array of book objects
			db.getAllBooks(function(books) {
				//create a new body
				var newBody = JSON.parse(JSON.stringify(books));
		
				//create the response body
				const responseBody = { headers, method, url, newBody };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			});
		}
		//remove a book listing by book id, as  a seller
		else if(request.method === 'POST' && request.url === '/removeBook'){
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			
			//return array of book objects
			db.removeBook(headers.bookid, function(book) {
				//create the response body
				const responseBody = { headers, method, url, book };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			});
		}
		
		//save a book, as a buyer, to the savedBooks DB
		else if(request.method === 'POST' && request.url === '/saveBook') {
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			
			//return the book
			db.saveBook(headers.bookid, headers.buyid, headers.sellid, function(bookid, buyid, sellid) {
			//create a new body
				var newBody = {
					book_id: bookid,
					buy_id: buyid,
					sell_id: sellid
				};
		
				//create the response body
				const responseBody = { headers, method, url, newBody };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			})
		}
		
		//get all saved books, for buyer
		else if(request.method === 'GET' && request.url === '/getMySavedBooks') {
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			
			//return array of book objects
			db.getMySavedBooks(headers.userid, function(books) {
				//create a new body
				var newBody = JSON.parse(JSON.stringify(books));
		
				//create the response body
				const responseBody = { headers, method, url, newBody };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			});
			
		}	
		
		//remove a saved book, as a buyer
		else if(request.method === 'POST' && request.url === '/removeSavedBook') {
			//on error, give to the console
			response.on('error', (err) => {
				console.error(err);
			});
			
			//return the book
			db.removeSavedBook(headers.bookid, headers.buyid, headers.sellid, function(bookid, buyid, sellid) {
			//create a new body
				var newBody = {
					book_id: bookid,
					buy_id: buyid,
					sell_id: sellid
				};
		
				//create the response body
				const responseBody = { headers, method, url, newBody };
		
				//echo the request JSON in the response body and end the response
				response.write(JSON.stringify(responseBody));
				response.end();
			})
		}
		

		else{
			//any other request isn't availabe
			response.statusCode = 404;
			response.end();
		}
	});
}).listen(8080); //activates a server, listening on port 8080

//end the connection to the host and database after the server has ended
//db.endConnection();