function validate1(){
	let fn = validateFirstName();
	let ln = validateLastName();
	let e = EmailValidation();
	let p1 = document.forms["contact information"]["psw"].value;
	let p2 = document.forms["contact information"]["psw-repeat"].value;
	const url = 'http://coms-319-t42.cs.iastate.edu:8080/addUser';

	if (EmailValidation() &&validateFirstName()  && validateLastName() && p1.localeCompare(p2) == 0) {
		let firstname = document.forms["contact information"]["firstName"].value;
		let lastname = document.forms["contact information"]["lastName"].value;
		let email = document.forms["contact information"]["email"].value;
		let psw = document.forms["contact information"]["psw"].value;
		let username = document.forms["contact information"]["userName"].value;
		const data = {firstname , lastname,username, email , psw};
		const options = {
			headers: {
				"content-type":"application/json; charset=UTF-8"
			},
			body: JSON.stringify(data),
			method:"POST",
			mode: 'cors',
		};
		fetch( url,options)
		.then(response => response.json())
		.then(data => {
		console.log(data.newBody);
		})
		.catch((err)=>console.log(err))
		return true;
	}
	else if (!fn){
		document.forms["contact information"]["firstName"].value = ""; 
		document.forms["contact information"]["firstName"].placeholder = "First name Invalid .only letters please";
	}
	else if (!ln){
		document.forms["contact information"]["lastName"].value = "";
		document.forms["contact information"]["lastName"].placeholder = "Last name is Invalid. only letters please";
	}
	else if (!e){
		document.forms["contact information"]["email"].value = "";
		document.forms["contact information"]["email"].placeholder = "Email is Invalid.";
	}
	else if (p1.length <=0 || p2.length<=0) {
		alert("A Password needs to be set");
	}
	else if (p1.localeCompare(p2) != 0){
		alert("Passwords are not matching");
	}
}
function validateLastName(){
	let isValidName = alphaCheck(document.forms["contact information"]["lastName"].value);
	if (isValidName){
		return true;
	}
	return false;
}
function validateFirstName(){
	let isValidName = alphaCheck(document.forms["contact information"]["firstName"].value);
	if (isValidName){
		return true;
	}
	return false;
}
function EmailValidation(){
	let isEmailValid = emailCheck(document.forms["contact information"]["email"].value);
	if (isEmailValid){
		return true;
	}
	return false;
}


function emailCheck(email) {
    atSplit = email.split('@');
    if (atSplit.length == 2 && alphaNumCheck(atSplit[0])) {
        periodSplit = atSplit[1].split('.')
        if (periodSplit.length == 2 && alphaCheck(periodSplit[0] + periodSplit[1])) {
            return true;
        }
    }
    valCheck = false;
    return false;
}
function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function alphaCheck(entry) {
    let regex = /^[A-Za-z]+$/;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}
