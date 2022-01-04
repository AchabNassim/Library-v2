	// Variables

	let title = document.getElementById ("titreForm");
	var messageTitle = document.getElementById ("messageTitle");

	let author = document.getElementById ("auteurForm");
	var messageAuthor = document.getElementById ("messageAuthor");

	let price = document.getElementById ("prixForm");
	var messagePrice = document.getElementById ("messagePrice");

	let date = document.getElementById("dateForm");
	var messageDate = document.getElementById ("messageDate");

	let language = document.getElementById("Langues");
	var messageLangue = document.getElementById ("messageLangue");

	let typeRadio = document.getElementsByClassName("type");
	var messageType = document.getElementById ("messageType");

	var valide = true;
	
	// Table Section

	var myTable = document.getElementById("table");

	var selectedType = "";
	// function

function validateForm (e){
	e.preventDefault();
	valide = false;

	// title

	if (title.value == ""){
		messageTitle.innerHTML = "please enter a title"	;
		return valide
		
	}
	else if (title.value.length <= 5 ){
		messageTitle.innerHTML = "The minimum is 5 characters";
		return valide
	}
	else if (title.value.length >= 30){
		messageTitle.innerHTML = "The maximum is 30 characters"	;
		return valide

		
	}
	else {
		messageTitle.innerHTML = "sent!";
		document.getElementById("messageTitle").style.color = "green";
		valide = true
	}
	

	// Author

	if (author.value == ""){
		messageAuthor.innerHTML = "please enter a name"	;
		return valide
		
	}
	else if (author.value.length <= 5 ){
		messageAuthor.innerHTML = "The minimum is 5 characters"	;
		return valide

	}
	else if (author.value.length >= 20){
		messageAuthor.innerHTML = "The maximum is 20 characters";
		return valide

	}
	else {
		messageAuthor.innerHTML = "sent!";
		document.getElementById("messageAuthor").style.color = "green";
		valide = true
	}

	// price

	if (isNaN(price.value)  || price.value <= 0){
		messagePrice.innerHTML = "Please enter a real number";
		return valide

	}
	else {
		messagePrice.innerHTML = "sent!";
		document.getElementById("messagePrice").style.color = "green";
		valide = true
	}

	// date

	if (date.value == ""){
		messageDate.innerHTML = "Please pick a date";
		return valide	

	}
	else {
		messageDate.innerHTML = "sent!";
		document.getElementById("messageDate").style.color = "green";
		valide = true
	}

 	// language 

	if (language.value == ""){
		messageLangue.innerHTML = "Please choose a language";
		return valide

	}
	else {
		messageLangue.innerHTML = "sent!";
		document.getElementById("messageLangue").style.color = "green";
		valide = true
	}

	// radio buttons


    var i = 0;
    while (i < typeRadio.length) {
        if (!typeRadio[i].checked){
        	messageType.innerHTML = "please pick a type";
        	valide = false;
        }
        else {
    	messageType.innerHTML = "Sent!";
    	document.getElementById("messageType").style.color = "green";
    	valide = true
    	break;
    }
        i++;
    }
    
    

    // Table insertion
		    
  		if(valide == true){	
  		
	    var newRow = myTable.insertRow();
	    var cell1 = newRow.insertCell(0);
	    var cell2 = newRow.insertCell(1);
	    var cell3 = newRow.insertCell(2);
	    var cell4 = newRow.insertCell(3);
	    var cell5 = newRow.insertCell(4);
	    var cell6 = newRow.insertCell(5);
	    var cell7 = newRow.insertCell(6);

	    // cell content
	    cell1.innerHTML = title.value;
	    cell2.innerHTML = author.value;
	    cell3.innerHTML = price.value;
	    cell4.innerHTML = date.value;
	    cell5.innerHTML = language.value;
	    cell7.innerHTML = `<input type="submit" onclick="edit(this)" value="edit" id="editbtn">` +
	    					`<input type="submit" onclick="Delete(this)" value="delete" id="deletebtn" >`    

	    // type
	    
	    for(var j = 0; j < typeRadio.length ; j++){
	    	if (typeRadio[j].checked){
	    		selectedType = typeRadio[j].value;
	    	}
	    }

	    cell6.innerHTML = selectedType;
    }
}

var form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", validateForm)

	// Delete function

function Delete(btn){
	const confirmText = "are you sure you want to delete this row?"
	if(confirm(confirmText) == true)
	var row = btn.parentNode.parentNode;
 	row.parentNode.removeChild(row);
}

	// edit function
function edit(r){
	var i = r.parentNode.parentNode.rowIndex;
	var row = myTable.rows[i]
	if (r.value == "edit"){
		title.value = row.cells[0].innerHTML;
		author.value = row.cells[1].innerHTML;
        price.value = row.cells[2].innerHTML;
        date.value = row.cells[3].innerHTML;
       	language.value = row.cells[4].innerHTML;

       	// type 
       	for(var j = 0; j < typeRadio.length ; j++){
       		if(row.cells[5].innerHTML == typeRadio[j].value){
       			typeRadio[j].checked = true;
       		}
		}
		// saving function
		r.value = "save"
		document.getElementById("submit").setAttribute("disabled", "true");
 }
		else {
			row.cells[0].innerHTML = title.value;
			row.cells[1].innerHTML = author.value;
			row.cells[2].innerHTML = price.value;
			row.cells[3].innerHTML = date.value;
			row.cells[4].innerHTML = language.value
			for(var j = 0 ; j < typeRadio.length; j++){
                    if (typeRadio[j].checked){
                        row.cells[5].innerHTML = typeRadio[j].value;
                    }
                }
           		r.value = "edit";
                document.getElementById("submit").removeAttribute("disabled")
		}
  	}