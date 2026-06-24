let books = [];

// BOOK CLASS
class Book {

    constructor(
        title,
        author,
        pages,
        description,
        read
    ){

        this.id =
            Date.now().toString() +
            Math.random()
            .toString(16)
            .slice(2);

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.description = description;
        this.read = read;
    }



    // TOGGLE READ STATUS
    toggleRead(){

        this.read = !this.read;
    }
}



// ADD BOOK
function addBook(
    title,
    author,
    pages,
    description,
    read
)

{

    const newBook = new Book(
        title,
        author,
        pages,
        description,
        read
    );

    books.push(newBook);

    displayBooks();
}



// DISPLAY BOOKS
function displayBooks(){

    const booksGrid =
        document.querySelector(".books-grid");



    booksGrid.innerHTML = "";



    books.forEach((book) => {

        const card =
            document.createElement("div");



        card.classList.add(
            "card",
            `read-${book.read}`
        );



        card.dataset.id = book.id;



        card.innerHTML = `

            <h3>${book.title}</h3>

            <p>${book.author}</p>

            <p>${book.pages} pages</p>

            <p>${book.description}</p>

            <p>
                Status:
                ${book.read
                    ? "Read"
                    : "Not Read Yet"}
            </p>

            <div class="card-buttons">

                <button class="toggle-btn">
                    Change Status
                </button>

                <button class="remove-btn">
                    Remove
                </button>

            </div>
        `;



        // REMOVE
        card
            .querySelector(".remove-btn")
            .addEventListener("click", () => {

                removeBook(book.id);
            });



        // TOGGLE
        card
            .querySelector(".toggle-btn")
            .addEventListener("click", () => {

                book.toggleRead();

                displayBooks();
            });



        booksGrid.appendChild(card);
    });
}



// REMOVE BOOK
function removeBook(id){

  
    books = books.filter(book => book.id !== id);


    displayBooks();
}


// DIALOG + FORM
const dialog =
    document.querySelector(".form-container");

const showNewBtn =
    document.getElementById("new-book-btn");

const form =
    document.getElementById("book-form");


// select form inputs for validation 
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages")


// OPEN DIALOG
showNewBtn.addEventListener("click", () => {

    dialog.showModal();
});



// form submit with custom validation
form.addEventListener("submit", (e) => {
    // reset custom validity before checking
    authorInput.setCustomValidity("");
    titleInput.setCustomValidity("");
    pagesInput.setCustomValidity("");

    // check for empty fields and apply custom messages
    if(!authorInput.value.trim()){
        authorInput.setCustomValidity("The authur name must be filled");
    }
    if(!titleInput.value.trim()){
        titleInput.setCustomValidity("The book title must be filled")
    }
    if(!pagesInput.value || pagesInput.value <= 0){
        pagesInput.setCustomValidity("Please enter a valid page number")
    }

    // trigger native browser validation ui if invalid
    if(!form.checkValidity()){
         e.preventDefault(); //stop form submission
         form.reportValidity();
         return;
    }

    // if valid proceed with adding book
    e.preventDefault();

    const title = titleInput.value;

    const author = authorInput.value;

    const pages = pagesInput.value;

    const description =  document.getElementById("description").value;

    const read = document.getElementById("read-status").checked;



    addBook(
        title,
        author,
        pages,
        description,
        read
    );

    form.reset();
    dialog.close();
});

