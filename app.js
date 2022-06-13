const shelves = document.getElementById('container-shelves');
const titleInput = document.querySelectorAll('input')[0];
const authorInput = document.querySelectorAll('input')[1];
const pagesInput = document.querySelectorAll('input')[2];
const readInput = document.querySelectorAll('select')[0];
const formButton = document.querySelectorAll('button')[0];

let library = [];

formButton.addEventListener('click', function() {
    clearLibrary();
    addBook();
    renderLibrary();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook() {
    let readBook = (readInput.value === 'read') ? true : false;
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, readBook);
    library.push(book);
}

function renderBook() {
    let bookDiv = document.createElement('div');
    let bookContentDiv = document.createElement('div');
    let bookTitle = document.createElement('h2');
    let bookAuthor = document.createElement('p');
    let bookPages = document.createElement('p');
    let bookButtons = document.createElement('div');
    let readButton = document.createElement('button');
    let removeButton = document.createElement('button');
    bookDiv.classList.add('book');
    bookContentDiv.classList.add('book-content');
    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    bookPages.classList.add('book-pages');
    bookButtons.classList.add('book-buttons');
    readButton.classList.add('book-not-read');
    removeButton.classList.add('book-remove');
    if (book.read === false) {
        readButton.innerText = 'Not Yet Read';
        readButton.classList.add('book-not-read');
    } else {
        readButton.innerText = 'Read';
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
}

function clearLibrary() {
    while (shelves.childNodes.length > 0) {shelves.firstChild.remove()}
}

function renderLibrary() {
    clearLibrary();
    for (book of library) {
        renderBook();
    }
}