const containerMain = document.getElementById('container-main');
const shelves = document.getElementById('container-shelves');
const titleInput = document.querySelectorAll('input')[0];
const authorInput = document.querySelectorAll('input')[1];
const pagesInput = document.querySelectorAll('input')[2];
const readInput = document.querySelectorAll('select')[0];
const formSubmitButton = document.getElementById('header-button');
let bookId;
let library = [];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
};

const addBook = () => {
    let readBook = (readInput.value === 'read') ? true : false;
    let book = Object.create(Book.prototype)
    book.title = titleInput.value;
    book.author = authorInput.value;
    book.pages = pagesInput.value;
    book.read = readBook;
    book.id = generateId();
    return library.push(book);
};

const renderBook = () => {
    let bookDiv = document.createElement('div');
    let bookContentDiv = document.createElement('div');
    let bookTitle = document.createElement('h2');
    let bookAuthor = document.createElement('p');
    let bookPages = document.createElement('p');
    let bookButtons = document.createElement('div');
    let readButton = document.createElement('button');
    let removeButton = document.createElement('button');
    bookDiv.classList.add('book');
    bookDiv.setAttribute('data-id', book.id)
    bookContentDiv.classList.add('book-content');
    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    bookPages.classList.add('book-pages');
    bookButtons.classList.add('book-buttons');
    // readButton.classList.add('book-not-read');
    removeButton.classList.add('book-remove');
    if (book.read === false) {
        readButton.innerText = 'Not Yet Read';
        readButton.classList.add('book-status')
        readButton.classList.add('book-not-read');
    } else {
        readButton.innerText = 'Read';
        readButton.classList.add('book-status')
        readButton.classList.add('book-read')
    }
    bookTitle.innerText = book.title;
    bookAuthor.innerText = book.author;
    bookPages.innerText = `${book.pages} pages`;
    removeButton.innerText = 'Remove Book'
    shelves.appendChild(bookDiv);
    bookDiv.append(bookContentDiv, bookButtons);
    bookContentDiv.append(bookTitle, bookAuthor, bookPages);
    bookButtons.append(readButton, removeButton);
};

const clearLibrary = () => {
    while (shelves.childNodes.length > 0) {shelves.firstChild.remove();
    }
}

const renderLibrary = () => {
    clearLibrary();
    for (book of library) {
        renderBook();
    }
};

const generateId = () => Math.floor(Math.random() * 1000000); 

const isMatch = (element) => element.id == bookId;

const findIndexOfBook = () => {
    bookId = event.target.parentElement.parentElement.dataset.id;
    return library.findIndex(isMatch);
}

const removeBook = () => {
    library.splice(findIndexOfBook(), 1);
    clearLibrary();
    renderLibrary();
};

const toggleReadStatus = () => {
   library[findIndexOfBook()].read === true ? library[findIndexOfBook()].read = false : library[findIndexOfBook()].read = true;
   clearLibrary();
   renderLibrary();
}

containerMain.addEventListener('click', (event) => {
console.log(event.target.className);
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  } else if (event.target.id === 'header-button') {
        clearLibrary();
        addBook();
        renderLibrary();
  } else if (event.target.className === 'book-status book-not-read' || 
    event.target.className === 'book-status book-read') {
        toggleReadStatus();
  } else if (event.target.parentElement.parentElement.dataset.id != undefined 
    && event.target.className === 'book-remove') {
        removeBook();
  }
});