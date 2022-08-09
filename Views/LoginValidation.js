function validate1(){
	let psw = document.forms["contact information"]["psw"].value;
	let username = document.forms["contact information"]["userName"].value;
	const url = 'http://coms-319-t42.cs.iastate.edu:8080/verify';
	const data = {username, psw};
	const options = {
		method:"POST",
		headers: {
			"content-type":"application/json; charset=UTF-8"
		},
		body: JSON.stringify(data),
		mode: 'no-cors'
	};
	fetch( url,options)
		.then(response => response.json())
		.then(data => {
		console.log(data.newBody);
		})
		.catch((err)=>console.log(err))
	return true;
	}