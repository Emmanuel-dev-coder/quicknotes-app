let form = document.querySelector("#note-form");
let noteInput = document.querySelector("#note-input");
let noteCategory = document.querySelector("#note-category");
let notesList = document.querySelector("#notes-list");
let errorMessage = document.querySelector("#error-message");
let noteCount = document.querySelector("#note-count");

let notes = [];

function render() {
    notesList.textContent = "";

    for (let note of notes) {
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

    render();

    noteInput.value = "";
});