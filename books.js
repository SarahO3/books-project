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
){

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

    books = books.filter(
        (book) => book.id !== id
    );

    displayBooks();
}


// DIALOG + FORM
const dialog =
    document.querySelector(".form-container");

const showNewBtn =
    document.getElementById("new-book-btn");

const form =
    document.getElementById("book-form");



// OPEN DIALOG
showNewBtn.addEventListener("click", () => {

    dialog.showModal();
});



// FORM SUBMIT
form.addEventListener("submit", (e) => {

    e.preventDefault();



    const title =
        document.querySelector("#title").value;

    const author =
        document.querySelector("#author").value;

    const pages =
        document.querySelector("#pages").value;

    const description =
        document.querySelector("#description").value;

    const read =
        document.querySelector("#read-status").checked;



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

