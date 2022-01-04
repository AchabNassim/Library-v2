	// Variables

	let title = document.getElementById ("titreForm");
	var messageTitle = document.getElementById ("messageTitle");
	var letters = /^[A-Za-z ]+$/;

	let author = document.getElementById ("auteurForm");
	var messageAuthor = document.getElementById ("messageAuthor");

	let price = document.getElementById ("prixForm");
	var messagePrice = document.getElementById ("messagePrice");
	let prix = /^\d+\.?\d*$/

	let date = document.getElementById("dateForm");
	var messageDate = document.getElementById ("messageDate");

	let language = document.getElementById("Langues");
	var messageLangue = document.getElementById ("messageLangue");

	let typeRadio = document.getElementsByClassName("type");
	var messageType = document.getElementById ("messageType");

	let email = document.getElementById("email")
	var messageEmail = document.getElementById("messageEmail")
	let mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	var valide = true;
	class Book {
		constructor(title,author,price,date,language,type,email){
			this.title = title;
			this.author = author;
			this.price = price;
			this.date = date;
			this.language = language;
			this.type = type;
			this.email = email;
		}
		DétailOuvrage(){
			return "l'ouvrage " + this.title + "est un " + this.type + "en langue " + this.language + ", écrit par " + this.author + "et publié le " + this.date + "le prix est de " + this.price
		}
	}
	
	// Table Section

	var myTable = document.getElementById("table");
	var selectedType = "";
	let bookList = []
	// function

function validateForm (e){
	e.preventDefault();
	valide = false;

	// title

	if (letters.test(title.value) == false){
		messageTitle.textContent = "please enter a valid title";
		return valide
	}
	else {
		messageTitle.textContent = "sent!";
		document.getElementById("messageTitle").style.color = "green";
		valide = true
	}
	

	// Author

	if (letters.test(author.value) == false){
		messageAuthor.textContent = "please enter a name"	;
		return valide
	}
	else {
		messageAuthor.textContent = "sent!";
		document.getElementById("messageAuthor").style.color = "green";
		valide = true
	}

	// price

	if (prix.test(price.value) == false){
		messagePrice.textContent = "Please enter a valid number";
		return valide

	}
	else {
		messagePrice.textContent = "sent!";
		document.getElementById("messagePrice").style.color = "green";
		valide = true
	}

	// date

	if (date.value == ""){
		messageDate.textContent = "Please pick a date";
		return valide	

	}
	else {
		messageDate.textContent = "sent!";
		document.getElementById("messageDate").style.color = "green";
		valide = true
	}

 	// language 

	if (language.value == ""){
		messageLangue.textContent = "Please choose a language";
		return valide

	}
	else {
		messageLangue.textContent = "sent!";
		document.getElementById("messageLangue").style.color = "green";
		valide = true
	}

	// radio buttons


    var i = 0;
    while (i < typeRadio.length) {
        if (!typeRadio[i].checked){
        	messageType.textContent = "please pick a type";
        	valide = false;
        }
        else {
    	messageType.textContent = "Sent!";
    	document.getElementById("messageType").style.color = "green";
    	valide = true
    	break;
    }
        i++;
    }

    // Email
    if (mail.test(email.value)== false){
    	messageEmail.textContent = "Please enter a valid Email"
    	return valide
    }
    else {
    	messageEmail.textContent = "Sent!"
    	document.getElementById("messageEmail").style.color = "green";
    	valide = true
    }
    
    

    // Table insertion
		    
  		if(valide == true){
  			var checkedRadio = document.querySelector('input[name="type"]:checked');
  			var book = new Book(title.value,author.value,price.value,date.value,language.value,checkedRadio.value,email.value)
  			bookList.push(book);
  			//tri
  			for (var i = 0 ; i < bookList.length;i++){
  				myTable.innerHTML = ""
  				var newRow = myTable.insertRow()
  				newRow.insertCell(0).innerHTML = bookList[i].title;
  				newRow.insertCell(1).innerHTML = bookList[i].author;
  				newRow.insertCell(2).innerHTML = bookList[i].price;
  				newRow.insertCell(3).innerHTML = bookList[i].date;
  				newRow.insertCell(4).innerHTML = bookList[i].language;
  				newRow.insertCell(5).innerHTML = bookList[i].type;
  				newRow.insertCell(6).innerHTML = bookList[i].email;
  				newRow.insertCell(7).innerHTML =`<input type="submit" value="edit" onclick="edit(this)" id="editBtn">` +
  												`<input type="submit" value="delete" onclick="Delete(this)" id="deleteBtn">`

  			}
  	}
}  			
	    

var form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", validateForm)










function Delete(btn){
	const confirmText = "are you sure you want to delete this row?"
	if(confirm(confirmText) == true)
	var row = btn.parentNode.parentNode;
 	row.parentNode.removeChild(row);
}

