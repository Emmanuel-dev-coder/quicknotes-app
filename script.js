let form = document.querySelector("#note-form");
let noteInput = document.querySelector("#note-input");
let noteCategory = document.querySelector("#note-category");
let notesList = document.querySelector("#notes-list");
let errorMessage = document.querySelector("#error-message");
let noteCount = document.querySelector("#note-count");
let searchInput = document.querySelector("#search-input");

let notes = [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function render() {
    notesList.textContent = "";

    let searchText = searchInput.value.toLowerCase();

    let filteredNotes = notes.filter(function (note) {
        return note.text.toLowerCase().includes(searchText);
    });

    if (filteredNotes.length === 0 && searchText !== "") {
    let noResults = document.createElement("li");
    noResults.textContent = "No notes match your search.";
    notesList.appendChild(noResults);
    }

    for (let note of filteredNotes) { 
        let listItem = document.createElement("li");

        listItem.classList.add("category-" + note.category);

        let noteText = document.createElement("p");
        noteText.textContent = note.text;

        let category = document.createElement("small");
        category.textContent = note.category;

        let date = document.createElement("small");
        date.textContent = note.createdAt;

        listItem.appendChild(noteText);
        listItem.appendChild(category);
        listItem.appendChild(date);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            saveNotes();

            render();
        });

        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    }
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = "You have " + notes.length + " notes.";
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let text = noteInput.value.trim();

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    let note = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    saveNotes();

    render();

    noteInput.value = "";
});

let savedNotes = localStorage.getItem("notes");

if (savedNotes !== null) {
    notes = JSON.parse(savedNotes);
}

render();

searchInput.addEventListener("input", function () {
    render();
});