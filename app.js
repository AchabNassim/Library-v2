	// Variables

	let title = document.getElementById ("titreForm");
	var messageTitle = document.getElementById ("messageTitle");
	var letters = /^[A-Za-z ]+$/;
	let info = document.getElementById("info")

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
			return `l'ouvrage ${this.title} est un ${this.type}  en  ${this.language}, écrit par ${this.author} et publié le ${this.date} le prix est de  ${this.price}`
		}
	}
	
	// Table Section

	var myTable = document.getElementById("table");
	var selectedType = "";
	let bookList = []

	// localStorage

	var list = ""
	list = JSON.parse(localStorage.getItem("list"));
	if(list != null){
		for (i= 0 ; i < list.length ; i++){
			var localBooks = new Book (list[i].titre,list[i].author,list[i].price,list[i].date,list[i].language,list[i].type,list[i].email)
			bookList.push(localBooks)
			tri()
		}
	}
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
  			localStorage.setItem("list",JSON.stringify(bookList))
  			info.textContent = book.DétailOuvrage()
  			tri()
  			myTable.innerHTML = ""		
  			charger()		
	}  			
}	    

var form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", validateForm)


function charger(){
  			for (var i = 0 ; i < bookList.length;i++){	
  				let newRow = myTable.insertRow()
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


function tri(){
 		bookList.sort(function(a,b){
 		if( a.author < b.author){
 			return -1
	}
})
}


function Delete(btn){
	const confirmText = "are you sure you want to delete this row?"
	if(confirm(confirmText) == true)
	var row = btn.parentNode.parentNode.rowIndex-1;
 	bookList.splice(row,1)
 	localStorage.setItem("list",JSON.stringify(bookList))
 	myTable.innerHTML = ""
 	charger()
}

function edit(btn){
	var index = btn.parentNode.parentNode.rowIndex
	if (btn.value == edit){
			title.value = row.cells[0].innerHTML
			author.value = row.cells[1].innerHTML
			price.value = row.cells[2].innerHTML
			date.value = row.cells[3].innerHTML
			language.value = row.cells[4].innerHTML
			for (var i = 0 ; i < typeRadio.length ; i++ ){
				if (row.cells[5].checked == typeRadio[i].value)
					typeRadio[i].checked = true;
			}
			email.value = row.cells[6].innerHTML
			btn.value = "save"
		}
		

	else {
            bookList[index-1].title = title.value;
            bookList[index-1].author = author.value;
            bookList[index-1].price = price.value;
            bookList[index-1].date = date.value;
            bookList[index-1].language = language.value;
            for(var i=0; i < typeRadio.length ;i++){
                if(typeRadio[i].checked){
                    bookList[index-1].Type = typeRadio[i].value;
                }
            }
            bookList[index-1].email = email.value;
            myTable.innerHTML="";
            tri()
            charger();
            localStorage.setItem("list",JSON.stringify(bookList));
           	btn.value ="edit";
	}
}

charger();