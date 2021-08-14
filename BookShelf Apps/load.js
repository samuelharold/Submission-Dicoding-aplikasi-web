 
 const formBook = document.getElementById("inputBook");

 document.addEventListener("DOMContentLoaded", function() {
	formBook.addEventListener("submit", function(event) {
		event.preventDefault();
		addBook();
	});

	if(validStorage()) {
		loadSaveBook();
	};
 });

 document.addEventListener("sentDataServer", function() {
	console.log("Pusing pala ente!");
 });

 document.addEventListener("loadDataServer", function() {
	refreshDataBooks();
 });