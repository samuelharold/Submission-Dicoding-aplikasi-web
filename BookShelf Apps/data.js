
 const storageKey = "myLibrary";

 let books = [];

 function validStorage() {
	if(typeof(Storage) === undefined) {
		alert("notsupport storage Browser");
		return false
	};
	return true;
 };

 function saveBook() {
	const dataServer = JSON.stringify(books);
	localStorage.setItem(storageKey,dataServer);
	document.dispatchEvent(new Event("sentDataServer"));
 };

 function loadSaveBook() {
	const getDataServer = localStorage.getItem(storageKey);
	let newDataServer = JSON.parse(getDataServer);
	
	if(newDataServer !== null)
		books = newDataServer;
 	
	document.dispatchEvent(new Event("loadDataServer"));
 };

 function updateBookStorage() {
	if(validStorage())
		saveBook();
 };
 
 function addBookObject(title, author, year, isCompleted) {
	return {
		id: +new Date(),
		title,
		author,
		year,
		isCompleted
		};
};
 
 function findBooks(bookId) {
	for(book of books) {
		if(book.id === bookId)
		return book;
	};
	return null;
 };

 function findBookIndex(bookId) {
	let index = 0
	for(book of books) {
		if(book.id === bookId)
		return index;

		index++;
	};
	
	return -1;
 };

 function refreshDataBooks(ev) {
    const uncompletedBook = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const completedBook = document.getElementById(COMPLETED_LIST_TODO_ID);
	for(book of books) {
		const newBook = makeTodo(book.title, book.author, book.year, book.isCompleted);
			newBook[bookItemId] = book.id;

			if(book.isCompleted) {
				completedBook.append(newBook);
			} else {
				uncompletedBook.append(newBook);
			};
		};
 };