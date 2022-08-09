//database control
var mysql = require('mysql');

//my DB information on the VM
var con = mysql.createConnection({
	host: "coms-319-t42.cs.iastate.edu",
	user : "teamG42",
	password: "pswd",
	database: "TextBookXChange"
});
//create a dummy user object
var testUser = {
	firstName: "John",
	lastName: "Smith",
	userName: "jsmith",
	email: "test@gmail.com",
	psw: "123abc"
};

//create a connection to the host and database specified in con
function connect(){
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	});
}

//end the connection to the host and database specified in con
function endConnection(){
	con.end(function(err) {
		if (err) throw err;
		console.log("Connection ended!");
	});
}
	
	
//get the user associated with an ID
function getByID(id){
	var user;
	var sql = "SELECT * FROM users WHERE id = " + mysql.escape(id);
	
	con.query(sql, function(err, result) {
		if (err) throw err;
		console.log(result);
	});
} 

//get all of the books associated with a userID
function getMyBooks(id, fn){
	var userID = JSON.parse(id);
	
	var sql = "Select * FROM books WHERE user_id = ?";
	
	con.query(sql, [userID], function(err, result) {
		if(err) throw err;
		fn(result);
	});
}

//get all of the books with an isbn
function getBooksISBN(isbnStr, fn){
	var isbn = JSON.parse(isbnStr);
	
	var sql = "Select * FROM books WHERE isbn = ?";
	
	con.query(sql, [isbn], function(err, result) {
		if(err) throw err;
		console.log(result);
		fn(result);
	});
}

//get all of the books, one per isbn?
function getAllBooks(fn){
	var sql = "Select * FROM books";
	
	con.query(sql, function(err, result) {
		if(err) throw err;
		fn(result);
	});
}

 //add a user to the database, from registration form
 //add checking if the user already exists
function addUser(newUser, fn){
	
	var user = JSON.parse(newUser);
	
	 var sql = "INSERT INTO users (firstName, lastName, userName, email, psw) VALUES ?";
	 
	 var values = [
		[user.firstname, user.lastname, user.username, user.email, user.psw]
	];
	 
	 con.query(sql,[values], function(err, result) {
		if (err) throw err;
		
		insertid = (JSON.parse(JSON.stringify(result))).insertId;
		
		fn(insertid);
	});
}
 
 //add a book to a user with userID, isbn
 //returns the book, or null on fail
 //add checking if the book already exists for the user
 function addBook(bookStr, fn){

	var book = JSON.parse(bookStr);
	
	var sql = "INSERT INTO books (user_id, isbn) VALUES ?";
	
	var values = [
		[book.userid, book.isbn]
	];
	
	con.query(sql,[values], function(err, result) {		
		if (err) throw err;
		
		insertid = (JSON.parse(JSON.stringify(result))).insertId;
		
		fn(insertid);
	});
 }
 
 //remove a book by its id
 //returns null
 function removeBook(bookidStr, fn) {
	 
	 var bookid = JSON.parse(bookidStr);
	 
	 var sql = "DELETE FROM books WHERE book_id = ?";
	 
	 con.query(sql, [bookid], function(err, result) {
		if (err) throw err;
		
		fn(null);
	 });
 }
 
 //check if there is a user with the userName and psw
 function checkUser(userStr, fn){
	 
	var user = JSON.parse(userStr);
	
	var sql = "SELECT * FROM users WHERE userName = ? AND psw = ?";
	
	con.query(sql,[user.username,user.psw], function(err, result) {
		if (err) throw err;
		
		if(result.length == 0){
			fn(null);
		}
		else{
			var user = JSON.parse(JSON.stringify(result));
			fn(user[0]);
		}
	});
 }
 
 //save a book to the savedBooks DB, with the userID of the buyer and seller as well as the bookid
 //returns the same values
 function saveBook(bookStr, buyStr, sellStr, fn) {
	var bookid = JSON.parse(bookStr);
	var buyid = JSON.parse(buyStr);
	var sellid = JSON.parse(sellStr);
	
	var sql = "INSERT INTO saved_books (book_id, buy_id, sell_id) VALUES ?";
	
	var values = [
		[bookid, buyid, sellid]
	];
	
	con.query(sql,[values], function(err, result) {		
		if (err) throw err;
		
		fn(bookid, buyid, sellid);
	});
 }	 
 
//get all of the saved books associated with a buy_id
function getMySavedBooks(id, fn){
	var userID = JSON.parse(id);
	
	var sql = "Select * FROM saved_books WHERE buy_id = ?";
	
	con.query(sql, [userID], function(err, result) {
		if(err) throw err;
		fn(result);
	});
}
 
  //remove a book from the savedBooks DB, with the user_id of the buyer and seller as well as the book_id
 //returns null
 function removeSavedBook(bookStr, buyStr, sellStr, fn) {
	var bookid = JSON.parse(bookStr);
	var buyid = JSON.parse(buyStr);
	var sellid = JSON.parse(sellStr);
	
	var sql = "DELETE FROM saved_books WHERE book_id = " + bookid + " AND buy_id = " + buyid + " AND sell_id = " + sellid;
	console.log(sql);
	
	var values = [
		[bookid, buyid, sellid]
	];
	
	con.query(sql,[values], function(err, result) {		
		if (err) throw err;
		
		fn(null);
	});
 }	 
	 
	 

 
 module.exports = { connect, endConnection, checkUser, addUser, addBook, getMyBooks, getBooksISBN, getAllBooks, removeBook, saveBook, getMySavedBooks, removeSavedBook }