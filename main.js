window.addEventListener('beforeunload', save);
// VIEWS
let booksView = document.querySelector('#book-view');
let editDeleteView = document.querySelector('#edit-delete-view');
let newBookView = document.querySelector('#new-book-view');

let booksTbody = document.querySelector('tbody');

// BUTTONS
// Navbar
let booksViewBtn = document.querySelector('#books-view-btn');
let newBookViewBtn = document.querySelector('#new-book-view-btn');
let editDeleteViewBtn = document.querySelector('#edit-delete-btn');
let saveBtn = document.querySelector('#save-btn');

//FORMS
// Add new book
let inputName = document.querySelector('[name="book"]');
let inputDate = document.querySelector('#date');
// Options
let genreSelect = document.querySelector('#genre-select');
let publisherSelect = document.querySelector('#publisher-select');

// LISTENERS
booksViewBtn.addEventListener('click', displayBooksView);
newBookViewBtn.addEventListener('click', displayNewBookView);
editDeleteViewBtn.addEventListener('click', displayEditDeleteBookView);
saveBtn.addEventListener('click', saveNewBook);

function save() {
    localStorage.db = JSON.stringify(db);
}

// Displays
function displayBooksView(e) {
    if (e) {
        e.preventDefault()
    }
    editDeleteView.style.display = "none";
    newBookView.style.display = "none";
    booksView.style.display = "block";
}

function displayNewBookView(e) {
    if (e) {
        e.preventDefault()
    }
    createGenreOptions();
    createPublisherOptions();
    editDeleteView.style.display = "none";
    booksView.style.display = "none";
    newBookView.style.display = "block";
}

function displayEditDeleteBookView(e) {
    if (e) {
        e.preventDefault()
    }
    booksView.style.display = "none";
    newBookView.style.display = "none";
    editDeleteView.style.display = "block";
}

// Options
function createGenreOptions() {
    let text = '';
    allGenre.forEach(genre => {
        text += `
            <option value="${genre}">${genre}</option>
        `.trim()
    })
    genreSelect.innerHTML = text;
}

function createPublisherOptions() {
    let text = '';
    allPublisher.forEach(pub => {
        text += `
            <option value="${pub}">${pub}</option>
        `.trim()
    })
    publisherSelect.innerHTML = text;
}

// Create Books Table
function createBookTable(currentDb) {    
    console.log(currentDb);
    if (!currentDb) {
        currentDb = db;
    }
    let text = '';
    currentDb.forEach(book => {
        text += `
        <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.ganre}</td>
            <td>${book.publisher}</td>
            <td>${book.date}</td>
         </tr>
        `.trim()
    })
    booksTbody.innerHTML = text;
    
}

//Save new book
function saveNewBook() {
    let newBook = {
        id: generateId(),
        name: inputName.value,
        ganre: genreSelect.value,
        publisher: publisherSelect.value,
        date: inputDate.value
    }
    db.push(newBook);
    console.log(db);
    
    createBookTable(db);
    displayBooksView();
    

}
// create ID
function generateId() {
    let randomId;
    let unique = false;
    while (!unique) {
        unique = true;
        randomId = Math.floor(Math.random() * 100000);
        db.forEach(book => {
            if (parseInt(book.id) === randomId) {
                unique = false;
            }
        })
    }
    return randomId.toString();
}
