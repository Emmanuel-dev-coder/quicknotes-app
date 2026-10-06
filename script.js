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
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let note = {
        id: Date.now(),
        text: noteInput.value,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    render();

    noteInput.value = "";
});