 const UNCOMPLETED_LIST_TODO_ID = "incompleteBookshelfList";
 const COMPLETED_LIST_TODO_ID = "completeBookshelfList";
 const bookItemId = "itemId";
 const searchButton = document.getElementById("searchSubmit");

function makeTodo(title, author, year, isCompleted) {

    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("item")
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("item")
    bookAuthor.innerText = author;

    
    const bookYear = document.createElement("p");
    bookYear.classList.add("item")
    bookYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("action")

    const container = document.createElement("article");
    container.classList.add("book_item")
    container.append(bookTitle, bookAuthor, bookYear, textContainer);
    
    if(isCompleted){
        textContainer.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        textContainer.append(
            createCheckButton(),
 	    createTrashButton()
        );
    };

    return container;
};

function createUndoButton() {
    return createButton("green","undo", function(event){
        undoTaskFromCompleted(event.target.parentElement.parentElement);
    });
};

function createTrashButton() {
    return createButton("red","hapus", function(event){
        removeTaskFromCompleted(event.target.parentElement.parentElement);
    });
};

function createCheckButton() {
    return createButton("green","selesai", function(event){
        addTaskToCompleted(event.target.parentElement.parentElement);
    });
};

function createButton(buttonTypeClass, name,  eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = name;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
};


function addBook() {
    const uncompletedBook = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const completedBook = document.getElementById(COMPLETED_LIST_TODO_ID);
    const inputCheck = document.getElementById("inputBookIsComplete").checked;
    const textTodo = document.getElementById("inputBookTitle").value;
    const timestamp = document.getElementById("inputBookAuthor").value;
    const timesYear = document.getElementById("inputBookYear").value;
    const unComplete = makeTodo(textTodo, timestamp, timesYear, false);
    const complete = makeTodo(textTodo, timestamp, timesYear, true);
    const dataObjectFalse = addBookObject(textTodo, timestamp, timesYear,false);
    const dataObjectTrue = addBookObject(textTodo, timestamp, timesYear, true);
    let input = inputCheck;	
	
	if(input) {
		complete[bookItemId] = dataObjectTrue.id;
		books.push(dataObjectTrue);
		completedBook.append(complete);
		console.log("selesai dibaca");

		updateBookStorage();
	} else {
		unComplete[bookItemId] = dataObjectFalse.id;
		books.push(dataObjectFalse);
		uncompletedBook.append(unComplete);
		console.log("belum dibaca");

		updateBookStorage();
	};
	
};


function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const title = taskElement.querySelectorAll(".item")[0].innerText;
    const author = taskElement.querySelectorAll(".item")[1].innerText;
    const year = taskElement.querySelectorAll(".item")[2].innerText;
    const newTodo = makeTodo(title, author, year, true);
    const book = findBooks(taskElement[bookItemId]);
    	book.isCompleted = true;
    	newTodo[bookItemId] = book.id;

    	listCompleted.append(newTodo);
    	taskElement.remove();
    	updateBookStorage();
};

function removeTaskFromCompleted(taskElement) {
    const deleteBook = findBookIndex(taskElement[bookItemId]);
	books.splice(deleteBook, 1);        
	let condition = true;
		if(condition) {
			confirm("Anda yakin ingin menghapus Buku?");
			taskElement.remove();
		};
	updateBookStorage();
};

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const title = taskElement.querySelectorAll(".item")[0].innerText;
    const author = taskElement.querySelectorAll(".item")[1].innerText;
    const year = taskElement.querySelectorAll(".item")[2].innerText;
    const newTodo = makeTodo(title, author, year, false);
    const book = findBooks(taskElement[bookItemId]);
	book.isCompleted = false;

    	listUncompleted.append(newTodo);
    	taskElement.remove();
	updateBookStorage();
};

 searchButton.addEventListener("click", function(ev) {
	const inputSearch = document.getElementById("searchBookTitle").value.toLowerCase();
	const article = document.querySelectorAll("article");
	
	
	for(let i of article) {
		const newArticle = i.firstElementChild.textContent.toLowerCase();
		if(newArticle.indexOf(inputSearch) != -1) {
			i.removeAttribute("hidden");
			console.log("block kode berhasil");
		} else {
			i.setAttribute("hidden", "hidden");
			console.log("block kode berhasil");
		};
	
	};
	ev.preventDefault();
});



			
			
	