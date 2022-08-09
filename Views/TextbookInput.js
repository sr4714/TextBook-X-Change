function validate1(){
	let isbn = document.forms["textbook information"]["ISBN"].value;
	let username = document.forms["textbook information"]["userName"].value;
	const data = {isbn, username};
	const options = {
			headers: {
				"content-type":"application/json; charset=UTF-8"
			},
			body: JSON.stringify(data),
			method:"POST",
			mode: 'cors',
		};
		fetch( 'http://coms-319-t42.cs.iastate.edu:8080/addBook',options)
		.then(response => response.json())
		.then(data => {
		console.log(data.newBody);
		})
		.catch((err)=>console.log(err))
	}